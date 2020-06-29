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
import {ShipFitting} from "../../../shared/src/model/ShipFitting";
import {ShipEquipmentEntity} from "../entities/ShipEquipmentEntity";
import {EQFactory} from "../equipment/EQFactory";
import {ShipEquipment} from "../../../shared/src/model/ShipEquipment";
import {PlayerSelfKillMessage} from "../../../shared/src/message/game/player/PlayerSelfKillMessage";
import {Scoreboard} from "./Scoreboard";
import {ScoreboardUpdateMessage} from "../../../shared/src/message/game/ScoreboardUpdateMessage";
import {Structure} from "../../../shared/src/model/Structure";
import {StructureEntity} from "../structures/StructureEntity";
import {StructurePortalEntity} from "../structures/StructurePortalEntity";
import {StructureSpawnMessage} from "../../../shared/src/message/game/structures/StructureSpawnMessage";
import {PlayerStructureMessage} from "../../../shared/src/message/game/player/movement/PlayerStructureMessage";
import {StructureLootEntity} from "../structures/StructureLootEntity";
import {StructureDestroyMessage} from "../../../shared/src/message/game/structures/StructureDestroyMessage";
import {CollisionDetection} from "../collision/CollisionDetection";
import {Rectangle, Vector2} from "../../../shared/src/util/VectorInterface";
import {BoundryUpdateMessage} from "../../../shared/src/message/game/BoundryUpdateMessage";
import {CMath} from "../utils/CMath";
import {MovementGoalAlignTo} from "../entities/input/MovementGoalAlignTo";
import {MovementGoalUseStructure} from "../entities/input/MovementGoalUseStructure";
import {Inventory} from "../../../shared/src/model/Inventory";
import {MovementGoalIdle} from "../entities/input/MovementGoalIdle";
import {MovementGoalFreeFly} from "../entities/input/MovementGoalFreeFly";
import {GameLogic} from "./GameLogic";
import {PlayerMessage} from "../../../shared/src/message/generic/PlayerMessage";


const gameloop = require('node-gameloop');

export class GameServer extends GameLogic {

  public activeConnectionCount: number = 0;

  private gameLoopId: number;

  private tickRate: number = 1000 / 60;

  constructor(private io: SocketIO.Server) {
    super();

    this.boundries.x1 = { x: -1200, y: -300};
    this.boundries.x2 = { x: 600, y: 600};

  }



  public stop() {
    console.log("Server stoped:", this.gameLoopId);
    gameloop.clearGameLoop(this.gameLoopId);
    this.gameLoopId = undefined;

  }

  public start() {
    if ( this.gameLoopId === undefined ) {
      this.gameLoopId = gameloop.setGameLoop( (delta) => {
        this.serverLoop(delta);
      }, this.tickRate);
      console.log("Server started: ", this.gameLoopId);
    }

    if ( this.players.length === 0 ) {
      this.spawnDefaultEnemy();
      console.log("Enemy spawned");
    }

  }

  public checkOnlineState(): boolean {
    return this.hasActivePlayer() || this.activeConnectionCount > 0;
  }

  public hasActivePlayer(): boolean {
    return this.players.filter( (player) => !player.isNPC).length > 0;
  }

  public serverLoop(delta: number) {
    if ( this.checkOnlineState() === false ) {
      this.stop();
    }

    this.gameLoop(delta);
    this.gc();
  }

  public onMessage(msg: Message, broadCast, singleCast) {
    super.onMessage(msg, broadCast, singleCast);
  }

  public send(msg) {
    this.io.emit("message", msg);
  }

}
