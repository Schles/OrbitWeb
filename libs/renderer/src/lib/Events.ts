import { EventEmitter } from '@angular/core';

import { ShipFitting } from '@orbitweb/common';
import { Spaceship } from '@orbitweb/common';
import { Vector2 } from '@orbitweb/common';
import { Structure } from '@orbitweb/common';

export class Events {
  public static onPlayerKilled: EventEmitter<string> = new EventEmitter<string>();
  public static playerHit: EventEmitter<{
    target: Spaceship;
    damage: number;
  }> = new EventEmitter<{ target: Spaceship; damage: number }>();

  public static playerClicked: EventEmitter<{
    target: Spaceship;
    localPosition?: Vector2;
    event: any;
  }> = new EventEmitter<{ target: Spaceship; event: any }>();
  public static structureClicked: EventEmitter<{
    target: Structure;
    event: any;
  }> = new EventEmitter<{ target: Structure; event: any }>();
  public static worldClicked: EventEmitter<any> = new EventEmitter<any>();
  public static canvasClicked: EventEmitter<any> = new EventEmitter<any>();

  public static loginPlayer: EventEmitter<{
    name: string;
    fitting: ShipFitting;
    spaceship?: Spaceship;
  }> = new EventEmitter<{
    name: string;
    fitting: ShipFitting;
    spaceship?: Spaceship;
  }>();
}
