import {EventEmitter, Output} from "@angular/core";

import {ShipFitting} from "../../../../shared/src/model/ShipFitting";
import {Spaceship} from "../../../../shared/src/model/Spaceship";

export class Game {
  public static shootLaser: EventEmitter<{ start: Spaceship, end: Spaceship}> = new EventEmitter<{ start: Spaceship, end: Spaceship}>();
  public static playerHit: EventEmitter<{ target: Spaceship, damage: number }> = new EventEmitter<{ target: Spaceship, damage: number }>();
  public static playerKilled: EventEmitter<{ target: Spaceship }> = new EventEmitter<{ target: Spaceship }>();
  public static playerClicked: EventEmitter<{target: Spaceship, event: any}> = new EventEmitter<{target: Spaceship, event: any}>();
  public static worldClicked: EventEmitter<any> = new EventEmitter<any>()


  public static loginPlayer: EventEmitter< { name: string, fitting: ShipFitting, spaceship?: Spaceship} > = new EventEmitter<{ name: string, fitting: ShipFitting, spaceship?: Spaceship}>();
}
