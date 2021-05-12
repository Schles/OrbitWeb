import { Projectile, Spaceship, Structure } from '@orbitweb/common';





export class GameManager {

  public players: Spaceship[] = [];
  public projectiles: Projectile[] = [];
  public structures: Structure[] = [];
  public skills: any[] = [];
}