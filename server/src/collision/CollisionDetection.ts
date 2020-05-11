import {Particle} from "../../../shared/src/model/Particle";
import {Structure} from "../../../shared/src/model/Structure";
import {Rectangle, Vector2} from "../../../shared/src/util/VectorInterface";
import {CollisionParticleWall} from "./contact/CollisionParticleWall";
import {CMath} from "../utils/CMath";
import {CollisionParticleParticle} from "./contact/CollisionParticleParticle";

export class CollisionDetection {

  public static detect(particles: Particle[], structures: Structure[], boundries: Rectangle) {
    particles.forEach( (particle) => {
      this.checkBoundries(particle, boundries);
    })

    this.partitionSpace(particles, boundries, 10);
  }

  public static checkBoundries(particle: Particle, boundry: Rectangle) {
    if ( particle.position.x - particle.radius < boundry.x1.x) {
      CollisionParticleWall.collide(particle,{x: 1, y: 0}, boundry.x1.x - ( particle.position.x - particle.radius));
    }

    if ( particle.position.x + particle.radius > boundry.x2.x) {
      CollisionParticleWall.collide(particle,{x: -1, y: 0}, (particle.position.x + particle.radius) - boundry.x2.x);
    }

    if ( particle.position.y - particle.radius < boundry.x1.y) {
      CollisionParticleWall.collide(particle,{x: 0, y: 1}, boundry.x1.y - ( particle.position.y - particle.radius));
    }

    if ( particle.position.y + particle.radius > boundry.x2.y) {
      CollisionParticleWall.collide(particle,{x: 0, y: -1}, (particle.position.y + particle.radius) - boundry.x2.y);
    }

  }

  public static partitionSpace(particles: Particle[], boundry: Rectangle, depth: number) {
    const r1c = 10;
    const r2c = 10;


      if (particles.length < 2)
        return;

      if ( particles.length === 2) {


        const distanceBetweenCircles: number = CMath.len(CMath.sub(particles[0].position, particles[1].position))  ;

//        console.log(distanceBetweenCircles);

        if ( distanceBetweenCircles < (r1c + r2c)) {
          const penDepth = r1c + r2c - distanceBetweenCircles;

          CollisionParticleParticle.collide(particles[0], particles[1], penDepth);
        }

        return;
      }

      if ( depth === 0) {
        for ( let i = 0; i < particles.length; i++) {
          for (let j = i + 1 ; j < particles.length; j++) {
            const distanceBetweenCircles: number = CMath.len(CMath.sub(particles[i].position, particles[j].position))  ;

            if ( distanceBetweenCircles < (r1c + r2c)) {
              const penDepth = r1c + r2c - distanceBetweenCircles;

              CollisionParticleParticle.collide(particles[i], particles[j], penDepth);
            }
          }
        }
        return;
      }

      const w = boundry.x2.x - boundry.x1.x;
      const h = boundry.x2.y - boundry.x1.y;

      let r1: Rectangle;
      let r2: Rectangle;

      if ( w > h) {
        r1 = {
          x1: {
            x: boundry.x1.x,
            y: boundry.x1.y,
          },
          x2: {
            x: boundry.x1.x + w/2,
            y: boundry.x2.y
          }
        };

        r2 = {
          x1: {
            x: boundry.x1.x + w/2,
            y: boundry.x1.y,
          },
          x2: {
            x: boundry.x2.x,
            y: boundry.x2.y
          }
        };
      } else {
        r1 = {
          x1: {
            x: boundry.x1.x,
            y: boundry.x1.y,
          },
          x2: {
            x: boundry.x2.x,
            y: boundry.x1.y + h/2
          }
        };

        r2 = {
          x1: {
            x: boundry.x1.x,
            y: boundry.x1.y + h/2,
          },
          x2: {
            x: boundry.x2.x,
            y: boundry.x2.y
          }
        };
      }


      const s1: Particle[] = [];
      const s2: Particle[] = [];

      particles.forEach( (particle) => {
        if (this.isInRectangle(particle, r1))
          s1.push(particle);
        else
          s2.push(particle);
      });

      this.partitionSpace(s1, r1, depth - 1);
      this.partitionSpace(s2, r2, depth - 1);


  }



  public static isInRectangle(particle: Particle, boundry: Rectangle): boolean {
    if (particle.position.x >= boundry.x1.x && particle.position.x <= boundry.x2.x) {
      if ( particle.position.y >= boundry.x1.y && particle.position.y <= boundry.x2.y)
        return true;
    }
    return false;
  }

}
