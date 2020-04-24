import {Message} from "../../../shared/src/message/Message";
import {Spaceship} from "../../../shared/src/model/Spaceship";
import {PlayerLoginMessage} from "../../../shared/src/message/login/PlayerLoginMessage";
import {PlayerJoinedMessage} from "../../../shared/src/message/game/player/PlayerJoinedMessage";
import {Physics} from "../../../shared/src/physics/Physics";
import {PlayerUpdateMessage} from "../../../shared/src/message/game/player/PlayerUpdateMessage";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";
import {PlayerMoveToMessage} from "../../../shared/src/message/game/player/movement/PlayerMoveToMessage";
import {PlayerOrbitMessage} from "../../../shared/src/message/game/player/movement/PlayerOrbitMessage";
import {SkillEntity} from "../entities/SkillEntity";
import {PlayerActionMessage} from "../../../shared/src/message/game/player/PlayerActionMessage";
import { PlayerTargetSkillUsedMessage} from "../../../shared/src/message/game/player/PlayerSkillUsedMessage";
import {Skill} from "../../../shared/src/model/Skill";
import {SkillFactory} from "../utils/SkillFactory";
import {ProjectileEntity} from "../entities/ProjectileEntity";
import {ProjectileUpdateMessage} from "../../../shared/src/message/game/projectile/ProjectileUpdateMessage";
import {EventManager} from "./EventManager";
import {ProjectileSpawnMessage} from "../../../shared/src/message/game/projectile/ProjectileSpawnMessage";
import {ProjectileDestroyMessage} from "../../../shared/src/message/game/projectile/ProjectileDestroyMessage";
import {PlayerKilledMessage} from "../../../shared/src/message/game/player/PlayerKilledMessage";

const gameloop = require('node-gameloop');

export class GameServer {

  private uniqueIterator: number = 0;

  private gameLoopId: number;

  private players: SpaceshipEntity[] = [];

  private skills: SkillEntity[] = [];

  private projectiles: ProjectileEntity[] = [];

  constructor(private io: SocketIO.Server) {
    this.init();
  }

  public init() {
    this.spawnEnemy("Enemy");

    this.gameLoopId = gameloop.setGameLoop( (delta) => {
      // `delta` is the delta time from the last frame
      this.gameLoop(delta);
      //console.log('Hi there! (frame=%s, delta=%s)', frameCount++, delta);

      this.gc();
    }, 1000 / 60);

    EventManager.shootProjectile.on('shootProjectile', (msg) => {

      const projectile: ProjectileEntity = new ProjectileEntity(''+this.getUniqueId(), msg.source, msg.target);
      projectile.onInit();

      this.projectiles.push(projectile);

      const res: Message = new ProjectileSpawnMessage(projectile, msg.source.id, msg.target.id);
      this.send(res);


    });


    EventManager.shootProjectile.on('playerHit', (msg) => {


        msg.target.health -= msg.damage;

        console.log(msg.target.health);
/*
        if (health <= 0) {
          this.socketService.send(new KillingBlowMessage(this.ownPlayer.id, value.target.id, value.damage));
        } else {
          this.socketService.send(new DamageMessage(this.ownPlayer.id, value.target.id, value.damage));
        }
*/
    });


  }

  public stop() {
    gameloop.clearGameLoop(this.gameLoopId);
  }

  public spawnEnemy(name: string) {
    const sp = new Spaceship(name, this.getColor());

    const player = new SpaceshipEntity(sp);
    player.onInit();
    this.players.push(player);
  }

  public gameLoop(delta: number) {

      this.players.forEach( (player) => {
        player.iterate(delta);
        Physics.iterate(player, delta);

        const msg = new PlayerUpdateMessage(player);
        this.send(msg);
      });


    this.projectiles.forEach( value => {
      value.iterate(delta);

      const msg = new ProjectileUpdateMessage(value);
      this.send(msg);
    });

    this.skills.forEach( (skill: Skill) => {
      skill.iterate(delta);
    })


  }

  public send(msg) {
    this.io.emit("message", msg);
  }

  public onMessage(msg: Message, broadCast, singleCast) {
    console.log(msg);

    let p, t;


    switch (msg.type) {
      case "playerLoginMessage":
        this.onPlayerLogin((<PlayerLoginMessage>msg));
        break;

      case "playerJoinedMessage":
        break;

      case "lobbyQueryMessage":
        this.players.forEach( (player) => {
          const resmsg: PlayerJoinedMessage = new PlayerJoinedMessage(player);
          this.send(resmsg);
        })

        break;

      case "playerMoveToMessage":
        p = this.getPlayer((<PlayerMoveToMessage> msg).source);

        if ( p !== undefined) {
          p.targetPosition = (<PlayerMoveToMessage> msg).position;
          p.actionOrbitTarget = false;
        }
        break;

      case "playerOrbitMessage":
        p = this.getPlayer((<PlayerOrbitMessage> msg).source);

        if ( p !== undefined) {
          t = this.getPlayer((<PlayerOrbitMessage> msg).target);
          if ( t !== undefined) {
            p.targetPlayer = t;
            p.actionOrbitTarget = true;
          }
        }
        break;

      case "playerActionMessage":
        this.onPlayerAction(<PlayerActionMessage> msg);
        break;

      default:
        console.log("unknown message");
        break;
    }

  }

  private getPlayer(name: string): SpaceshipEntity {
    return this.players.find( (p) => p.id === name);
  }

  private onPlayerAction(msg: PlayerActionMessage) {

    const player: SpaceshipEntity = this.getPlayer(msg.source);

    if ( player === undefined) {
      console.error("Action from unkown user", msg);
      return;
    }

    let res;

    if (msg.action.targetEnemy) {
      if ( player.targetPlayer === undefined) {
        console.log("no target player focused");
        return;
      }

      const target = this.getPlayer(player.targetPlayer.id);

      const skill: SkillEntity = SkillFactory.createTargetSkill(msg.action.skillId, player, target);
      skill.onInit();
      this.skills.push(skill);

      res = new PlayerTargetSkillUsedMessage(msg.source, player.targetPlayer.id, msg.action.skillId);
    } else if (msg.action.targetSelf) {

      const skill: SkillEntity = SkillFactory.createTargetSkill(msg.action.skillId, player, player);
      skill.onInit();
      this.skills.push(skill);

      skill.id = msg.action.skillId;
      res = new PlayerTargetSkillUsedMessage(msg.source, msg.source, msg.action.skillId);
    } else if (msg.action.targetPosition !== undefined){
      //msg = new SkillUsedMessage(action.skillId, ownPlayer.id, null, action.targetPosition);
    }

    this.send(res);

  }

  private onPlayerLogin(msg: PlayerLoginMessage) {

    let player = this.players.find( (p) => p.id === msg.source);



    if ( player === undefined) {
      const sp = new Spaceship(msg.source, this.getColor());

      player = new SpaceshipEntity(sp);

      player.onInit();
      this.players.push(player);


    }



    const resmsg: PlayerJoinedMessage = new PlayerJoinedMessage(player);
    this.send(resmsg);
  }

  public getColor(): string {
    return '#'+Math.random().toString(16).substr(2,6);
  }

  public getUniqueId(): number {
    return this.uniqueIterator++;
  }

  private gc() {

    // Player
    const removePlayer: SpaceshipEntity[] = [];

    this.players.forEach( (player: SpaceshipEntity) => {
      if( player.health <= 0)
        removePlayer.push(player);
    })

    removePlayer.forEach( (value: SpaceshipEntity) => {
      const index = this.players.findIndex( value1 => value1.id === value.id)
      this.players[index].onDestroy();
      this.players.splice(index, 1);

      const msg: Message = new PlayerKilledMessage(value, undefined);
      this.send(msg);


      this.players.forEach( value1 => {
        if ( value1.targetPlayer.id === value.id)
          value1.targetPlayer = undefined;
      });
    })

    // Skills
    const removeSkills: SkillEntity[] = [];

    this.skills.forEach( (skill: SkillEntity) => {
      if( skill.remainingTime < 0)
        removeSkills.push(skill);
    })

    removeSkills.forEach( value => {
      const index = this.skills.findIndex( value1 => value1.id === value.id)
      this.skills[index].onDestroy();
      this.skills.splice(index, 1);
    })


    // Projectiles
    const removeProjectiles: ProjectileEntity[] = [];

    this.projectiles.forEach( value => {
      if( value.remainingTime < 0)
        removeProjectiles.push(value);
    });

    removeProjectiles.forEach( value => {
      const index = this.projectiles.findIndex( value1 => value1.id === value.id)
      this.projectiles[index].onDestroy();
      this.projectiles.splice(index, 1);

      const msg = new ProjectileDestroyMessage(value);
      this.send(msg);
    })

  }

}
