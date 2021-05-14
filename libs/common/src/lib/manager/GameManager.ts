import { Message, Projectile, Spaceship, Structure } from '@orbitweb/common';
import { EventManager } from './EventManager';





export class GameManager {

  public players: Spaceship[] = [];
  public projectiles: Projectile[] = [];
  public structures: Structure[] = [];
  public skills: any[] = [];

  public eventManager: EventManager;

  public send(message: Message) {

  }

}