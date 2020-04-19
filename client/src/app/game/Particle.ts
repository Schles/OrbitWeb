

export class Particle {

  public position: { x: number, y: number;};
  public speed: { x: number, y: number;};
  public accel: { x: number, y: number;};

  public rotation: number = 0;

  constructor() {
    this.position = { x: 0, y: 0};
    this.speed = { x: 0, y: 0};
    this.accel = { x: 0, y: 0};
  }



}
