import {Particle} from "./Particle";


export class Physics {

  constructor() {

  }

  public static iterate(particle: Particle, delta: number) {
    particle.position.x += particle.speed.x * delta;
    particle.position.y += particle.speed.y * delta;

    particle.speed.x += particle.accel.x * delta;
    particle.speed.y += particle.accel.y * delta;

    particle.rotation += particle.omega * delta;

    particle.omega = 0;

    particle.accel.x = 0;
    particle.accel.y = 0;
  }

  public static renderParticle() {

  }



}
