import {
  EnemySpawnMessage,
  GameFactory,
  GameIterable, GameManager,
  Message,
  PlayerMessage,
  PlayerUpdateMessage,
  ProjectileSpawnMessage,
  ProjectileUpdateMessage,
  Rectangle
} from '@orbitweb/common';
import { CollisionDetection } from '../../../game-engine/src/lib/CollisionDetection';
import { GarbageCollector } from './core/GarbageCollector';
import { Scoreboard } from './core/Scoreboard';

import { StructurePortalEntity } from '../../../../entities/server/src/entity/structures/StructurePortalEntity';
import { EventManager } from './EventManager';
import { ProjectileEntity } from '../../../../entities/server/src/model/ProjectileEntity';
import { SpaceshipEntity } from '../../../../entities/server/src/model/SpaceshipEntity';


export class GameLogic extends GameManager {
  public uniqueIterator: number = 0;


  public scoreboard: Scoreboard;

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
    this.scoreboard = new Scoreboard();

    this.spawnPortal(-700, 450);

    EventManager.shootProjectile.on('shootProjectile', (msg) => {
      this.onShootProjectile(msg);
    });

    EventManager.shootProjectile.on('playerHit', (msg) => {
      this.onPlayerHit(msg);
    });
  }

  public gameLoop(delta: number) {
    [...this.players, ...this.skills, ...this.structures].forEach(
      (gameIterable: GameIterable) => {
        gameIterable.iterate(delta);
      }
    );

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
    /*
    const msg: ServerEnemySpawnMessage = new ServerEnemySpawnMessage(
      new EnemySpawnMessage('Enemy')
    );
    msg.onRecieve(this);
    */

  }


  public spawnPortal(x: number, y: number) {
    let structure = new StructurePortalEntity(x, y, this.scoreboard);
    structure.id = '' + this.getUniqueId();
    this.structures.push(structure);
  }

  public onPlayerHit(msg: any) {
    msg.target.health -= msg.damage;
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
