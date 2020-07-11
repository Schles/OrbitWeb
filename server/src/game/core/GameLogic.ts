import {SpaceshipEntity} from "../model/SpaceshipEntity";
import {SkillEntity} from "../model/SkillEntity";
import {ProjectileEntity} from "../model/ProjectileEntity";
import {StructureEntity} from "../model/StructureEntity";
import {Scoreboard} from "../Scoreboard";
import {Rectangle, Vector2} from "../../../../shared/src/util/VectorInterface";
import {Physics} from "../../../../shared/src/physics/Physics";
import {PlayerUpdateMessage} from "../../../../shared/src/message/game/player/PlayerUpdateMessage";
import {ProjectileUpdateMessage} from "../../../../shared/src/message/game/projectile/ProjectileUpdateMessage";
import {Skill} from "../../../../shared/src/model/Skill";
import {CollisionDetection} from "./CollisionDetection";
import {EventManager} from "../EventManager";
import {Message} from "../../../../shared/src/message/Message";
import {ProjectileSpawnMessage} from "../../../../shared/src/message/game/projectile/ProjectileSpawnMessage";
import {PlayerLoginMessage} from "../../../../shared/src/message/login/PlayerLoginMessage";
import {PlayerJoinedMessage} from "../../../../shared/src/message/game/player/PlayerJoinedMessage";
import {StructureSpawnMessage} from "../../../../shared/src/message/game/structures/StructureSpawnMessage";
import {ScoreboardUpdateMessage} from "../../../../shared/src/message/game/ScoreboardUpdateMessage";
import {BoundryUpdateMessage} from "../../../../shared/src/message/game/BoundryUpdateMessage";
import {PlayerMoveToMessage} from "../../../../shared/src/message/game/player/movement/PlayerMoveToMessage";
import {CMath} from "../../utils/CMath";
import {MovementGoalAlignTo} from "../entity/movement/MovementGoalAlignTo";
import {PlayerOrbitMessage} from "../../../../shared/src/message/game/player/movement/PlayerOrbitMessage";
import {PlayerActionMessage} from "../../../../shared/src/message/game/player/PlayerActionMessage";
import {PlayerSelfKillMessage} from "../../../../shared/src/message/game/player/PlayerSelfKillMessage";
import {PlayerStructureMessage} from "../../../../shared/src/message/game/player/movement/PlayerStructureMessage";
import {MovementGoalIdle} from "../entity/movement/MovementGoalIdle";
import {PlayerKilledMessage} from "../../../../shared/src/message/game/player/PlayerKilledMessage";
import {Inventory} from "../../../../shared/src/model/Inventory";
import {ShipEquipment} from "../../../../shared/src/model/ShipEquipment";
import {StructureLootEntity} from "../entity/structures/StructureLootEntity";
import {ProjectileDestroyMessage} from "../../../../shared/src/message/game/projectile/ProjectileDestroyMessage";
import {StructureDestroyMessage} from "../../../../shared/src/message/game/structures/StructureDestroyMessage";
import {Spaceship} from "../../../../shared/src/model/Spaceship";
import {StructurePortalEntity} from "../entity/structures/StructurePortalEntity";
import {MovementGoalUseStructure} from "../entity/movement/MovementGoalUseStructure";
import {ShipFitting} from "../../../../shared/src/model/ShipFitting";
import {EquipmentDeserializer} from "./serialize/EquipmentDeserializer";
import {PlayerMessage} from "../../../../shared/src/message/generic/PlayerMessage";
import {ServerMessageRecieved} from "../model/ServerMessageRecieved";
import {MessageDeserializer} from "./serialize/MessageDeserializer";
import {GarbageCollector} from "./GarbageCollector";
import {ServerEnemySpawnMessage} from "../entity/message/ServerEnemySpawnMessage";
import {EnemySpawnMessage} from "../../../../shared/src/message/game/SpawnEnemyMessage";

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
