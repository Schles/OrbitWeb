import {Physics} from "@orbitweb/common";
import {Particle} from "@orbitweb/common";
import { ParticleContainer, Sprite } from "pixi.js";
import { string2hex } from "@pixi/utils"

class ParticleEffect extends Particle {
  public timeToLive: number = 0;
  public lifeTime: number = 2;
  public sprite: Sprite;
}


export class Emitter {

  private container: ParticleContainer;

  private size: number;

  private particles: ParticleEffect[];

  private particleIterator: number = 0;

  constructor(size: number) {
    this.container = new ParticleContainer( size, <any> {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true
    });

    this.size = size;
    this.particles = [];

  }

  public init() {
    const maggots = [];



    for (let i = 0; i < this.size; i++) {

      const particle: ParticleEffect = new ParticleEffect();
      particle.sprite = Sprite.from("assets/Particle.jpg");

      particle.sprite.tint = Math.random() * 0xE8D4CD;

      // set the anchor point so the texture is centerd on the sprite
      particle.sprite.anchor.set(0.5);

      // different maggots, different sizes
      particle.sprite.scale.set(0.8 + Math.random() * 0.3);

      // scatter them all
      particle.position.x = Math.random() * 500;
      particle.position.y = Math.random() * 500;

      particle.sprite.tint = Math.random() * 0x808080;
      particle.lifeTime = 3;
      particle.timeToLive = 0;
/*
      particle.speed = {
        x: 4,
        y: 4
      }
      */

      /*

      // create a random direction in radians
      dude.direction = Math.random() * Math.PI * 2;

      // this number will be used to modify the direction of the sprite over time
      dude.turningSpeed = Math.random() - 0.8;

      // create a random speed between 0 - 2, and these maggots are slooww
      dude.speed = (2 + Math.random() * 2) * 0.2;

      dude.offset = Math.random() * 100;
*/
      // finally we push the dude into the maggots array so it it can be easily accessed later
      this.particles.push(particle);

      this.container.addChild(particle.sprite);

    }

  }

  public getContainer(): ParticleContainer {
    return this.container
  }

  public update(delta) {

    this.particles.forEach( particle => {
      Physics.iterate(particle, delta);

      particle.timeToLive -= delta;

      if (particle.timeToLive < 0)
        particle.timeToLive = 0;

    });

    this.render();
  }

  public render() {
    this.particles.forEach( value => {

      if ( value.timeToLive === 0) {
        value.sprite.alpha = 0;
      } else {
        value.sprite.alpha = value.timeToLive / value.lifeTime;
      }



      value.sprite.x = value.position.x;
      value.sprite.y = value.position.y;

      value.sprite.rotation = value.rotation;



    })
  }

  public emit(sources: { p: Particle, c: any}[]) {
    sources.forEach( (spaceship) => {


          const particle: ParticleEffect = this.particles[this.particleIterator];

          particle.timeToLive = particle.lifeTime;

          particle.sprite.tint = string2hex(spaceship.c);

          particle.position = {
            x: spaceship.p.position.x,
            y: spaceship.p.position.y
          };

          particle.speed = {
            x: -1 * spaceship.p.speed.x,
            y: -1 * spaceship.p.speed.y
          };


          this.particleIterator++;

          if ( this.particleIterator >= this.size) {
            this.particleIterator = 0;
          }


    });
  }
}
