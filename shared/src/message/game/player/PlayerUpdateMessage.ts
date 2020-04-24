import {Spaceship} from "../../../model/Spaceship";
import {PlayerMessage} from "../../generic/PlayerMessage";

export class PlayerUpdateMessage extends PlayerMessage {
  public color: string;
  public x;
  public y;


  public speedX: number;
  public speedY: number;
  public rotation: number;
  public gun_rotation: number

  public target: string;
  public health: number;

  constructor(spaceship: Spaceship) {
    super(spaceship.id);
    this.color = spaceship.color;
    this.x = spaceship.position.x;
    this.y = spaceship.position.y;

    this.speedX = spaceship.speed.x;
    this.speedY = spaceship.speed.y;
    this.rotation = spaceship.rotation;
    this.gun_rotation = spaceship.cannon.rotation;

    this.health = spaceship.health;

    this.target = spaceship.targetPlayer !== undefined ? spaceship.targetPlayer.id : undefined;

    this.type = "playerUpdateMessage";
  }
}
