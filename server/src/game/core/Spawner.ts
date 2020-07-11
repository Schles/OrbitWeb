import {Spaceship} from "../../../../shared/src/model/Spaceship";
import {Rectangle, Vector2} from "../../../../shared/src/util/VectorInterface";
import {CMath} from "../../utils/CMath";

export class Spawner {
  constructor(private boundry: Rectangle) {

  }

  public spawnPosition(spaceship: Spaceship){
    if (spaceship.position === undefined || spaceship.position === null)
      this.spawnRandom(spaceship);
  }

  public spawnRandom(spaceship: Spaceship) {
    const spawnArea: Rectangle = this.getSpawnArea(this.boundry)
    const spawn = this.getSpawnPosition(spawnArea);

    spaceship.position = spawn.pos;
    spaceship.rotation = spawn.rotation;

    if ( !spaceship.isNPC )
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

}
