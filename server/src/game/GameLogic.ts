import {SpaceshipEntity} from "../entities/SpaceshipEntity";
import {SkillEntity} from "../entities/SkillEntity";
import {ProjectileEntity} from "../entities/ProjectileEntity";
import {StructureEntity} from "../structures/StructureEntity";
import {Scoreboard} from "./Scoreboard";
import {Rectangle, Vector2} from "../../../shared/src/util/VectorInterface";
import {Physics} from "../../../shared/src/physics/Physics";
import {PlayerUpdateMessage} from "../../../shared/src/message/game/player/PlayerUpdateMessage";
import {ProjectileUpdateMessage} from "../../../shared/src/message/game/projectile/ProjectileUpdateMessage";
import {Skill} from "../../../shared/src/model/Skill";
import {CollisionDetection} from "../collision/CollisionDetection";
import {EventManager} from "./EventManager";
import {Message} from "../../../shared/src/message/Message";
import {ProjectileSpawnMessage} from "../../../shared/src/message/game/projectile/ProjectileSpawnMessage";
import {PlayerLoginMessage} from "../../../shared/src/message/login/PlayerLoginMessage";
import {PlayerJoinedMessage} from "../../../shared/src/message/game/player/PlayerJoinedMessage";
import {StructureSpawnMessage} from "../../../shared/src/message/game/structures/StructureSpawnMessage";
import {ScoreboardUpdateMessage} from "../../../shared/src/message/game/ScoreboardUpdateMessage";
import {BoundryUpdateMessage} from "../../../shared/src/message/game/BoundryUpdateMessage";
import {PlayerMoveToMessage} from "../../../shared/src/message/game/player/movement/PlayerMoveToMessage";
import {CMath} from "../utils/CMath";
import {MovementGoalAlignTo} from "../entities/input/MovementGoalAlignTo";
import {PlayerOrbitMessage} from "../../../shared/src/message/game/player/movement/PlayerOrbitMessage";
import {PlayerActionMessage} from "../../../shared/src/message/game/player/PlayerActionMessage";
import {PlayerSelfKillMessage} from "../../../shared/src/message/game/player/PlayerSelfKillMessage";
import {PlayerStructureMessage} from "../../../shared/src/message/game/player/movement/PlayerStructureMessage";
import {MovementGoalIdle} from "../entities/input/MovementGoalIdle";
import {PlayerKilledMessage} from "../../../shared/src/message/game/player/PlayerKilledMessage";
import {Inventory} from "../../../shared/src/model/Inventory";
import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";
import {StructureLootEntity} from "../structures/StructureLootEntity";
import {ProjectileDestroyMessage} from "../../../shared/src/message/game/projectile/ProjectileDestroyMessage";
import {StructureDestroyMessage} from "../../../shared/src/message/game/structures/StructureDestroyMessage";
import {Spaceship} from "../../../shared/src/model/Spaceship";
import {StructurePortalEntity} from "../structures/StructurePortalEntity";
import {MovementGoalUseStructure} from "../entities/input/MovementGoalUseStructure";
import {ShipFitting} from "../../../shared/src/model/ShipFitting";
import {EQFactory} from "../equipment/EQFactory";
import {PlayerMessage} from "../../../shared/src/message/generic/PlayerMessage";

export class GameLogic {

  protected uniqueIterator: number = 0;

  protected players: SpaceshipEntity[] = [];

  protected skills: SkillEntity[] = [];

  protected projectiles: ProjectileEntity[] = [];

  protected structures: StructureEntity[] = [];

  protected scoreboard: Scoreboard;


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

    //this.spawnEnemy("Enemy", -100, 0, -1.5708);
    //this.spawnEnemy("Enemy2", 100, 0, 1.5708);
    this.spawnPortal(-700, 450);





    EventManager.shootProjectile.on('shootProjectile', (msg) => {
      const projectileEntity: ProjectileEntity = <ProjectileEntity> msg.projectile;
      projectileEntity.id = ''+this.getUniqueId();
      projectileEntity.onInit();

      this.projectiles.push(projectileEntity);

      const res: Message = new ProjectileSpawnMessage(projectileEntity, projectileEntity.source.id, projectileEntity.target.id);
      this.send(res);
    });

    EventManager.shootProjectile.on('playerHit', (msg) => {
      msg.target.health -= msg.damage;
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
        });

        this.projectiles.forEach( (proj) => {
          const resmsg1: ProjectileSpawnMessage = new ProjectileSpawnMessage(proj, proj.source.id, proj.target.id);
          this.send(resmsg1);
        });

        this.structures.forEach( (structure) => {
          const resmsg2: StructureSpawnMessage = new StructureSpawnMessage(structure);
          this.send(resmsg2);
        });

        const ansmsg = new ScoreboardUpdateMessage(this.scoreboard.scoreboard);
        this.send(ansmsg);

        const boundryMsg = new BoundryUpdateMessage(this.boundries);
        this.send(boundryMsg);



        break;

      case "playerMoveToMessage":
        p = this.getPlayer((<PlayerMoveToMessage> msg).source);



        if ( p !== undefined) {

          const dir =  CMath.sub((<PlayerMoveToMessage> msg).position, p.position);

          const reqAngle = CMath.angle(dir, {x: 0, y:1});
          p.movementGoal = new MovementGoalAlignTo(reqAngle);
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

      case "playerSelfKillMessage":
        this.onSelfKill(<PlayerSelfKillMessage> msg);
        break;

      case "playerStructureMessage":
        this.onPlayerStructure(<PlayerStructureMessage> msg);
        break;

      case "debugMessage":
        this.players.forEach( (player) => {
          player.speed = {x: 0, y:0};
          player.movementGoal = new MovementGoalIdle();
        });
        break;

      default:
        console.log("unknown message", msg);
        break;
    }

    if ( !!(<PlayerMessage> msg).source ) {
      const playerName = (<PlayerMessage> msg).source;
      const spaceShip: SpaceshipEntity = this.getPlayer(playerName);
      if ( spaceShip !== undefined ) {
        spaceShip.timestampLastActionMs = new Date().getTime();
      }
    }

  }

  protected getPlayer(name: string): SpaceshipEntity {
    return this.players.find( (p) => p.id === name);
  }

  protected getSpawnArea(boundries: Rectangle): Rectangle {
    return {
      x1: {
        x: -600,
        y: 200,
      },
      x2: {
        x: -200,
        y: 400,
      }
    };
  }

  protected getSpawnPosition(boundries: Rectangle, index?: any): {pos: Vector2, rotation: number } {

    let xRand = Math.random();
    let yRand = Math.random();

    const center = {
      x: boundries.x1.x + (boundries.x2.x - boundries.x1.x) / 2,
      y: boundries.x1.y + (boundries.x2.y - boundries.x1.y) / 2
    }

    const pos = {
      x: boundries.x1.x + Math.floor(xRand * Math.floor(boundries.x2.x - boundries.x1.x)),
      y: boundries.x1.y +Math.floor(yRand * Math.floor(boundries.x2.y - boundries.x1.y)),
    };


    const angle = CMath.angle(CMath.sub(center, pos), {x: 0, y: 1});

    return {
      pos: pos,
      rotation: angle
    };
  }

  public getColor(): string {
    return '#'+Math.random().toString(16).substr(2,6);
  }

  public getUniqueId(): number {
    return this.uniqueIterator++;
  }

  public gc() {
    const now: number = new Date().getTime();

    // Player
    const removePlayer: SpaceshipEntity[] = [];

    this.players.forEach( (player: SpaceshipEntity) => {
      if( player.health <= 0)
        removePlayer.push(player);
      else if ( !player.isNPC ) {
        const lastPlayerAction = player.timestampLastActionMs ? player.timestampLastActionMs : 0;
        const timeSinceLastAction = now - lastPlayerAction;

        if (timeSinceLastAction > player.maxIdleTimeMs) {
          player.silentRemove = true;
          removePlayer.push(player);
        }
      }

    })

    removePlayer.forEach( (value: SpaceshipEntity) => {
      const msgSB = new ScoreboardUpdateMessage(this.scoreboard.scoreboard);
      this.send(msgSB);

      const msg: Message = new PlayerKilledMessage(value, undefined);
      this.send(msg);

      if ( !value.silentRemove) {

        const inventoryLoot = value.inventory;
        const fittingLoot = value.fitting.fitting.reduce((acc: Inventory[], cur: ShipEquipment) => {
          if (cur.name !== "Empty") {
            const inventory = new Inventory(cur.name);
            inventory.amount = 1;
            acc.push(inventory)
          }

          return acc;
        }, []);

        const inventory: Inventory[] = inventoryLoot.concat(fittingLoot).reduce((acc: Inventory[], cur) => {
          let loot = acc.find((l) => l.name === cur.name)

          if (loot === undefined) {
            loot = new Inventory(cur.name);
            acc.push(loot);
          }

          loot.amount += cur.amount;

          return acc;
        }, []);

        const lootStructure = new StructureLootEntity(value.position.x, value.position.y, inventory);
        lootStructure.id = '' + this.getUniqueId();
        lootStructure.info = value.id;
        lootStructure.timestampSpawnMs = now;
        this.structures.push(lootStructure);

        const loot: Message = new StructureSpawnMessage(lootStructure);
        this.send(loot);
      }

      this.players.forEach( value1 => {
        if ( value1.targetPlayer !== undefined && value1.targetPlayer.id === value.id)
          value1.targetPlayer = undefined;
      });

      const index = this.players.findIndex( value1 => value1.id === value.id)
      this.players[index].onDestroy();
      this.players.splice(index, 1);
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
      if( value.timeToLife <= 0)
        removeProjectiles.push(value);
    });

    removeProjectiles.forEach( value => {
      const index = this.projectiles.findIndex( value1 => value1.id === value.id)
      this.projectiles[index].onDestroy();
      this.projectiles.splice(index, 1);

      const msg = new ProjectileDestroyMessage(value);
      this.send(msg);
    })

    // Structures
    const removeStructures: StructureEntity[] = [];

    this.structures.forEach( (structure: StructureEntity) => {
      if( structure.destroy)
        removeStructures.push(structure);
      else if ( !structure.isStatic) {
        const spawnTime = structure.timestampSpawnMs ? structure.timestampSpawnMs : 0;
        const timeSinceSpawn = now - spawnTime;

        if (timeSinceSpawn > structure.maxIdleTimeMs) {
          removeStructures.push(structure);
        }
      }
    })

    removeStructures.forEach( value => {
      const index = this.structures.findIndex( value1 => value1.id === value.id);
      this.structures[index].onDestroy();
      this.structures.splice(index, 1);

      this.players.forEach( (player) => {
        if ( player.targetStructure !== undefined && player.targetStructure.id === value.id ) {
          console.log("hatte den im target");
          player.targetStructure = undefined;
          player.actionUseStructure = false;
        }
      });

      const msg = new StructureDestroyMessage(value);
      this.send(msg);
    })


  }

  private onSelfKill(msg: PlayerSelfKillMessage) {
    const player = this.getPlayer(msg.source);

    if ( player !== undefined) {
      player.health = 0;
    }
  }


  /**
   *    Actions
   */

  public spawnDefaultEnemy() {
    const spawnArea = this.getSpawnArea(this.boundries);
    const spawn = this.getSpawnPosition(spawnArea);
    this.spawnEnemy("Enemy", spawn.pos.x, spawn.pos.y, spawn.rotation);
  }

  public spawnEnemy(name: string, x: number, y: number, r: number) {
    const sp = new Spaceship(name, this.getColor());

    const player = new SpaceshipEntity(sp);
    player.isNPC = true;
    player.position.x = x;
    player.position.y = y;
    player.rotation = r;
    /*
    player.speed = {
      x: 0,
      y: 10
    }

     */
    player.movementGoal = new MovementGoalIdle();
    //player.movementGoal = new MovementGoalFreeFly();
    player.fitting = new ShipFitting();

    const eq = new ShipEquipment("Loot", 3, 0, 0, 1, true, {});
    player.fitting.fitting.push(eq);

    player.onInit();
    this.players.push(player);
  }

  public spawnPortal(x: number, y: number) {
    let structure = new StructurePortalEntity(x, y, this.scoreboard);
    structure.id = ''+this.getUniqueId();
    this.structures.push(structure);
  }


  private onPlayerStructure(msg: PlayerStructureMessage) {
    const player: SpaceshipEntity = this.getPlayer(msg.source);

    const structure: StructureEntity = this.structures.find ( (structure) => {
      return structure.id === msg.structureId;
    });

    if ( player !== undefined && structure !== undefined) {
      player.movementGoal = new MovementGoalUseStructure(structure);
    }
  }

  private onPlayerAction(msg: PlayerActionMessage) {
    const player: SpaceshipEntity = this.getPlayer(msg.source);

    if ( player === undefined) {
      console.error("Action from unkown user", msg);
      return;
    }

    let res;

    if ( msg.skillIndex >= player.fitting.fitting.length) {
      console.log("skill not available");
      return;
    }

    const shipEquipment: ShipEquipment = player.fitting.fitting[msg.skillIndex]
    if ( shipEquipment.name !== "Empty")
      shipEquipment.state.pendingState = !shipEquipment.state.pendingState;
  }

  private onPlayerLogin(msg: PlayerLoginMessage) {

    let player = this.players.find( (p) => p.id === msg.source);

    if ( player === undefined) {
      const sp = new Spaceship(msg.source, this.getColor());

      player = new SpaceshipEntity(sp);
      player.fitting = new ShipFitting();
      player.fitting.fitting = msg.fitting.fitting.map( (fit) => {
        const eq = EQFactory.create(fit);
        eq.onInit(player);
        return eq;
      });


      const spawnArea: Rectangle = this.getSpawnArea(this.boundries)
      const spawn = this.getSpawnPosition(spawnArea);

      player.position = spawn.pos;
      player.rotation = spawn.rotation;
      player.timestampLastActionMs = new Date().getTime();

      player.onInit();
      this.players.push(player);


    }



    const resmsg: PlayerJoinedMessage = new PlayerJoinedMessage(player);
    this.send(resmsg);
  }


}
