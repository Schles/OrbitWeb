import {SpaceshipEntity} from "./model/SpaceshipEntity";
import {SkillEntity} from "./model/SkillEntity";
import {ProjectileEntity} from "./model/ProjectileEntity";
import {StructureEntity} from "./model/StructureEntity";
import {Scoreboard} from "./core/Scoreboard";
import {Rectangle, Vector2} from "@orbitweb/common";
import {Physics} from "@orbitweb/common";
import {PlayerUpdateMessage} from "@orbitweb/common";
import {ProjectileUpdateMessage} from "@orbitweb/common";
import {Skill} from "@orbitweb/common";
import {CollisionDetection} from "../../../game-engine/src/lib/CollisionDetection";
import {EventManager} from "./EventManager";
import {Message} from "@orbitweb/common";
import {ProjectileSpawnMessage} from "@orbitweb/common";

import {StructurePortalEntity} from "./entity/structures/StructurePortalEntity";

import {PlayerMessage} from "@orbitweb/common";

import {MessageDeserializer} from "./serialize/MessageDeserializer";
import {GarbageCollector} from "./core/GarbageCollector";
import {ServerEnemySpawnMessage} from "./entity/message/ServerEnemySpawnMessage";
import {EnemySpawnMessage} from "@orbitweb/common";

export class GameLogic {

  public uniqueIterator: number = 0;

  public players: SpaceshipEntity[] = [];

  public skills: SkillEntity[] = [];

  public projectiles: ProjectileEntity[] = [];

  public structures: StructureEntity[] = [];

  public scoreboard: Scoreboard;

  public boundries: Rectangle = {
    x1: {
      x: -1000,
      y: -500,
    },
    x2: {
      x: 2000,
      y: 1000
    }
  };

  constructor() {

    this.scoreboard = new Scoreboard();

    this.spawnPortal(-700, 450);


    EventManager.shootProjectile.on('shootProjectile', (msg) => {
      this.onShootProjectile(msg)
    });

    EventManager.shootProjectile.on('playerHit', (msg) => {
      this.onPlayerHit(msg);
    });



  }

  public gameLoop(delta: number) {
    this.players.forEach( (player) => {
      player.iterate(delta);
      Physics.iterate(player, delta);

      const msg = new PlayerUpdateMessage(player);
      this.send(msg);
    });


    this.projectiles.forEach( (value: ProjectileEntity) => {
      value.iterate(delta);

      const msg = new ProjectileUpdateMessage(value);
      this.send(msg);
    });

    this.skills.forEach( (skill: Skill) => {
      skill.iterate(delta);
    })

    CollisionDetection.detect(this.players, this.structures, this.boundries);
  }

  public send(msg) { }


  public onMessage(msg: Message, broadCast, singleCast) {
    const serverMessage = MessageDeserializer.deserialize(msg);

    if (serverMessage) {
      serverMessage.onRecieve(this);
    }

    if ( !!(<PlayerMessage> msg).source ) {
      const playerName = (<PlayerMessage> msg).source;
      const spaceShip: SpaceshipEntity = this.getPlayer(playerName);
      if ( spaceShip !== undefined ) {
        spaceShip.timestampLastActionMs = new Date().getTime();
      }
    }

  }

  public getPlayer(name: string): SpaceshipEntity {
    return this.players.find( (p) => p.id === name);
  }



  public getUniqueId(): number {
    return this.uniqueIterator++;
  }

  public gc() {
    GarbageCollector.execute(this);
  }


  public spawnDefaultEnemy() {
    const msg: ServerEnemySpawnMessage = new ServerEnemySpawnMessage(new EnemySpawnMessage("Enemy"));
    msg.onRecieve(this);

  }

  public spawnPortal(x: number, y: number) {
    let structure = new StructurePortalEntity(x, y, this.scoreboard);
    structure.id = ''+this.getUniqueId();
    this.structures.push(structure);
  }

  public onPlayerHit(msg: any) {
    msg.target.health -= msg.damage;
  }

  public onShootProjectile(msg: any) {
    const projectileEntity: ProjectileEntity = <ProjectileEntity> msg.projectile;
    projectileEntity.id = ''+this.getUniqueId();
    projectileEntity.onInit();

    this.projectiles.push(projectileEntity);

    const res: Message = new ProjectileSpawnMessage(projectileEntity, projectileEntity.source.id, projectileEntity.target.id);
    this.send(res);
  }



}
