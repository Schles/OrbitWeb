import {EventEmitter} from "@angular/core";
import {Vector2, Vector3} from "./CMath";
import {Spaceship} from "./Spaceship";

export class Game {
  public static renderLaser: EventEmitter<{ start: Vector2, end: Vector2}> = new EventEmitter<{ start: Vector2, end: Vector2}>();
  public static playerHit: EventEmitter<{ target: Spaceship, damage: number }> = new EventEmitter<{ target: Spaceship, damage: number }>();
  public static playerKilled: EventEmitter<{ target: Spaceship }> = new EventEmitter<{ target: Spaceship }>();
  public static playerClicked: EventEmitter<{target: Spaceship, event: any}> = new EventEmitter<{target: Spaceship, event: any}>();
  public static worldClicked: EventEmitter<any> = new EventEmitter<any>()
}
