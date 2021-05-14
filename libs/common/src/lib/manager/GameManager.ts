import { Message, Projectile, Spaceship, Structure } from '@orbitweb/common';
import { EventManager } from './EventManager';





export class GameManager {

  public players: Spaceship[] = [];
  public projectiles: Projectile[] = [];
  public structures: Structure[] = [];
  public skills: any[] = [];

  public static eventManager: EventManager = new EventManager();

  public send(message: Message) {

  }

}