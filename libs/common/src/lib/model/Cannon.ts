import { Spaceship } from './Spaceship';

export class Cannon {
  public parent: Spaceship;

  public get targetPlayer(): Spaceship {
    return this.parent.targetPlayer;
  }

  public rotation: number = 0;

  public maxOmega: number = 0.3;

  protected remainingCooldown: number = 0;

  public cooldownDuration: number = 5;

  public range: number = 200;

  public damage: number = 10;

  public maxAimAngle = 0.01;

  constructor(spaceship: Spaceship) {
    this.parent = spaceship;
  }
}
