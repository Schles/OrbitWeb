import * as events from 'events';

export class EventManager {


  public static shootProjectile = new events.EventEmitter();
//  public static playerHit: EventEmitter<{ target: Spaceship, damage: number }> = new EventEmitter<{ target: Spaceship, damage: number }>();
  //public static playerKilled: EventEmitter<{ target: Spaceship }> = new EventEmitter<{ target: Spaceship }>();
}
