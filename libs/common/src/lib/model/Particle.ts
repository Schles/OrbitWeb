import { ScalingValue } from './ScalingValue';

export class Particle {
  public position: { x: number; y: number };
  public speed: { x: number; y: number };
  public accel: { x: number; y: number };

  public rotation: number = 0;
  public omega: ScalingValue = new ScalingValue(0);



  public mass: number = 1;
  public radius: number = 10;

  constructor() {
    this.position = { x: 0, y: 0 };
    this.speed = { x: 0, y: 0 };
    this.accel = { x: 0, y: 0 };
  }
}
