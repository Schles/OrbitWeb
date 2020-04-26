import {Spaceship} from "../../../model/Spaceship";
import {PlayerMessage} from "../../generic/PlayerMessage";
import {ShipEquipmentState} from "../../../model/ShipEquipment";
import {ShipFitting} from "../../../model/ShipFitting";

export class PlayerUpdateMessage extends PlayerMessage {
  public color: string;
  public x;
  public y;


  public speedX: number;
  public speedY: number;
  public rotation: number;

  public fitting: ShipFitting;

  public target: string;
  public health: number;
  public power: number;

  constructor(spaceship: Spaceship) {
    super(spaceship.id);
    this.color = spaceship.color;
    this.x = spaceship.position.x;
    this.y = spaceship.position.y;

    this.speedX = spaceship.speed.x;
    this.speedY = spaceship.speed.y;
    this.rotation = spaceship.rotation;
    this.fitting = new ShipFitting();
    this.fitting.fitting = spaceship.fitting.fitting.map( (fit) => {
      return <any> {
        name: fit.name,
        state: fit.state,
        remainingTime: fit.remainingTime
      }
    });

    this.health = spaceship.health;
    this.power = spaceship.power;
    this.target = spaceship.targetPlayer !== undefined ? spaceship.targetPlayer.id : undefined;

    this.type = "playerUpdateMessage";
  }
}
