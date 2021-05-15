import {
  EnemySpawnMessage,
  GameManager,
  getRandomColor, MessageRecieved, Rectangle,
  Server,
  ShipEquipment,
  ShipFitting,
  Spaceship, Vector2
} from '@orbitweb/common';
import { SpaceshipEntity } from '../../model/SpaceshipEntity';
import { MovementGoalOrbit } from '../movement/MovementGoalOrbit';




@Server("EVENT", "enemyJoinedMessage")
export class ServerEnemySpawnMessage extends MessageRecieved<EnemySpawnMessage> {
  constructor(message: EnemySpawnMessage) {
    super(message);
  }

  onRecieve(context: GameManager) {
    const sp = new Spaceship('Enemy', getRandomColor());

    const player = new SpaceshipEntity(sp);
    player.isNPC = true;

    this.spawnRandom(player);

    player.position = { x: 100, y: 100 };

    player.movementGoal = new MovementGoalOrbit({ x: 0, y: 0 }, 200);
    //player.movementGoal = new MovementGoalFreeFly();
    player.fitting = new ShipFitting();

    const eq = new ShipEquipment('Loot', 3, 0, 1, true, {});
    player.fitting.fitting.push(eq);

    player.onInit();
    context.players.push(player);
  }

  public spawnRandom(spaceship: Spaceship) {
    const spawnArea: Rectangle = this.getSpawnArea(undefined);
    const spawn = this.getSpawnPosition(spawnArea);

    spaceship.position = spawn.pos;
    spaceship.rotation = spawn.rotation;

    if (!spaceship.isNPC)
      spaceship.timestampLastActionMs = new Date().getTime();
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
      },
    };
  }

  protected getSpawnPosition(
    boundries: Rectangle,
    index?: any
  ): { pos: Vector2; rotation: number } {
    let xRand = Math.random();
    let yRand = Math.random();

    const center = {
      x: boundries.x1.x + (boundries.x2.x - boundries.x1.x) / 2,
      y: boundries.x1.y + (boundries.x2.y - boundries.x1.y) / 2,
    };

    const pos = {
      x:
        boundries.x1.x +
        Math.floor(xRand * Math.floor(boundries.x2.x - boundries.x1.x)),
      y:
        boundries.x1.y +
        Math.floor(yRand * Math.floor(boundries.x2.y - boundries.x1.y)),
    };
    /*
    const angle = CMath.angle(CMath.sub(center, pos), { x: 0, y: 1 });
*/
    return {
      pos: pos,
      rotation: 0,
    };
  }
}
