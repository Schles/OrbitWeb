import {
  EnemySpawnMessage, EventManager,
  GameFactory,
  GameIterable, GameManager,
  Message,
  PlayerMessage,
  PlayerUpdateMessage,
  ProjectileSpawnMessage,
  ProjectileUpdateMessage,
  Rectangle
} from '@orbitweb/common';

import { GarbageCollector } from './GarbageCollector';
import { CollisionDetection, Physics } from '@orbitweb/game-engine';
import { ProjectileEntity, SpaceshipEntity, StructurePortalEntity } from '@orbitweb/server-entities';


export class GameLogic extends GameManager {
  public uniqueIterator: number = 0;

  public physics: Physics;


  public boundries: Rectangle = {
    x1: {
      x: -1000,
      y: -500,
    },
    x2: {
      x: 2000,
      y: 1000,
    },
  };

  constructor() {
    super();
    this.physics = new Physics();

    this.spawnPortal(-700, 450);

    GameManager.eventManager.on('SHOOT_PROJECTILE').subscribe( (msg) => {
      this.onShootProjectile(msg);
    });

    GameManager.eventManager.on('DIRTY_SINGLETON').subscribe( (msg) => {
      this.send(msg);
    });
  }

  public gameLoop(delta: number) {
    [...this.players, ...this.skills, ...this.structures].forEach(
      (gameIterable: GameIterable) => {
        gameIterable.iterate(delta);
      }
    );

    this.players.forEach( (p) => {
      this.physics.playerPhysics.iterate(p, delta);
    })

    this.projectiles.forEach((p: ProjectileEntity) => {
      p.iterateContext(delta, this);
    });

    this.players.forEach((player) => {
      const msg = new PlayerUpdateMessage(player);
      this.send(msg);
    });

    this.projectiles.forEach((value: ProjectileEntity) => {
      const msg = new ProjectileUpdateMessage(value);
      this.send(msg);
    });

    CollisionDetection.detect([], this.structures, this.boundries);
  }

  public send(msg) {}

  public onMessage(msg: Message, broadCast, singleCast) {
    const serverMessage = GameFactory.instantiateServerEvent(msg);

    if (serverMessage) {
      serverMessage.onRecieve(this);
    }

    if (!!(<PlayerMessage>msg).source) {
      const playerName = (<PlayerMessage>msg).source;
      const spaceShip: SpaceshipEntity = this.getPlayer(playerName);
      if (spaceShip !== undefined) {
        spaceShip.timestampLastActionMs = new Date().getTime();
      }
    }
  }

  public getPlayer(name: string): SpaceshipEntity {
    return this.players.find((p) => p.id === name) as SpaceshipEntity;
  }

  public getUniqueId(): number {
    return this.uniqueIterator++;
  }

  public gc() {
    GarbageCollector.execute(this);
  }

  public spawnDefaultEnemy() {
    this.onMessage(new EnemySpawnMessage("Enemy"), false, false);
  }


  public spawnPortal(x: number, y: number) {
    let structure = new StructurePortalEntity(x, y, undefined);
    structure.id = '' + this.getUniqueId();
    this.structures.push(structure);
  }

  public onShootProjectile(msg: any) {
    const projectileEntity: ProjectileEntity = <ProjectileEntity>msg.projectile;
    projectileEntity.id = '' + this.getUniqueId();
    projectileEntity.onInit();

    this.projectiles.push(projectileEntity);

    const res: Message = new ProjectileSpawnMessage(
      projectileEntity,
      projectileEntity.source.id
    );
    this.send(res);
  }
}
