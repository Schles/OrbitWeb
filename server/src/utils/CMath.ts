import * as math from 'mathjs';
import {Tangents, Vector2, Vector3} from "../../../shared/src/util/VectorInterface";
import {Particle} from "../../../shared/src/model/Particle";




export class CMath {

  constructor() {

  }

  public static normalize(vec: Vector2): Vector2 {
    const res:number = <number> math.norm( [vec.x, vec.y]);
    return { x: vec.x / res, y: vec.y / res};
  }

  public static clamp(vec: Vector2) {

  }

  public static rotate(vec: Vector2, a: number): Vector2 {
    //const angle = a / 180 * math.pi;
    const angle = a;

    return {
      x: math.cos(angle) * vec.x - math.sin(angle) * vec.y,
      y: math.sin(angle) * vec.x + math.cos(angle) * vec.y
    }
  }

  public static angle(tDir: Vector2, orient: Vector2): number {
/*
    const dotProduct = math.dot( [tDir.x, tDir.y], [orient.x, orient.y])

    return math.acos(dotProduct / ( math.norm( [tDir.x, tDir.y]) * math.norm( [orient.x, orient.y])));

*/

    //const a = A.x - C.x;
    //float b = A.y - C.y;
    //float c = B.x - C.x;
    //float d = B.y - C.y;
/*
    const a = tDir.x;
    const b = tDir.y;
    const c = orient.x;
    const d = orient.y;

    const angleA = math.atan2(b, a);
    const angleB = math.atan2(d, c);
    const rotationAngleRad = angleA - angleB;
    return rotationAngleRad;
*/

    let angle = math.acos(this.dot(tDir, orient));


    const cross = this.cross(tDir, orient);
    /*
    if (dotProduct(Vn, cross) < 0) { // Or > 0
      angle = -angle;
    }



    */

    if (this.dot3( {x: 0, y: 0, z: 1}, cross) > 0) {
      angle = -angle;
    }

    if ( angle.hasOwnProperty("re")) {
      angle = (<any> angle).re;
    }


    if (isNaN(angle))
      return 0;

    return angle;

  }

  public static degree(tDir: Vector2, orient: Vector2): number {

        const dotProduct: number = math.dot( [tDir.x, tDir.y], [orient.x, orient.y])

        const l_tDir: number = <number> math.norm( [tDir.x, tDir.y]);
        const l_orient: number = <number> math.norm( [orient.x, orient.y]);

        return math.acos(dotProduct / ( l_tDir * l_orient));


  }

  public static constructTangent(center: Vector2, radius: number, point: Vector2): Tangents {

    const b = math.sqrt((point.x - center.x) * (point.x - center.x) + (point.y - center.y) * (point.y - center.y));

    if ( radius > b) {
      // Inside circle
      return {
        isInside: true
      }
    } else if ( radius === b) {
      // on tangent
      return {
        isOnTangent: true
      }
    } else {

      const th = math.acos(radius / b); //  # angle theta
      const d = math.atan2(point.y - center.y, point.x - center.x); //  # direction angle of point P from C
      const d1 = d + th; //  # direction angle of point T1 from C
      const d2 = d - th; // # direction angle of point T2 from C

      const T1x = center.x + radius * math.cos(d1);
      const T1y = center.y + radius * math.sin(d1);
      const T2x = center.x + radius * math.cos(d2);
      const T2y = center.y + radius * math.sin(d2);

      return {
        tangents: {
          t1: { x: T1x, y: T1y},
          t2: { x: T2x, y: T2y},
        }
      };
    }
  }

  public static scale(v1: Vector2, scale: number): Vector2 {
    return {
      x: v1.x * scale,
      y: v1.y * scale
    }
  }

  public static add(v1: Vector2, v2: Vector2): Vector2 {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y
    }
  }

  public static sub(v1: Vector2, v2: Vector2): Vector2 {
    return {
      x: v1.x - v2.x,
      y: v1.y - v2.y
    }
  }

  public static len(v: Vector2): number {
    return <number> math.norm( [v.x, v.y]);
  }

  public static dot(v1: Vector2, v2: Vector2): number {
    const v1n = this.normalize(v1);
    const v2n = this.normalize(v2);
    const res = math.dot( [v1n.x, v1n.y], [v2n.x, v2n.y]);

    return res;
  }

  public static dot3(v1: Vector3, v2: Vector3): number {
    const v1n = this.normalize(v1);
    const v2n = this.normalize(v2);
    const res = math.dot([v1.x, v1.y, v1.z], [v2.x, v2.y, v2.z]);

    return res;
  }

  public static cross(v1: Vector2, v2: Vector2): Vector3 {
    const v1n = this.normalize(v1);
    const v2n = this.normalize(v2);

    const res = math.cross( [v1n.x, v1n.y, 0], [v2n.x, v2n.y, 0] );

    return {
      x: res[0],
      y: res[1],
      z: res[2]
    };
  }

  public static isInsideCircle(center: Vector2, point: Vector2, radius:number): boolean {

    const v = CMath.sub(point, center);

    const distance: number = <number> math.norm( [v.x, v.y] );

    return distance < radius;


  }

  public static getAngularVelocity(particle: Particle, target: Vector2): number {



    const r = {
      x: particle.position.x - target.x,
      y: particle.position.y - target.y
    };

    // TODO: winkel nur zwischen 0 und 180 grad
    const alpha = CMath.angle(r, particle.speed);

    const v_norm: number = <number> math.norm( [ particle.speed.x, particle.speed.y ]);
    const r_norm: number = <number> math.norm( [ r.x, r.y ]);
    //console.log(v_norm);

    //console.log(alpha * 180 / math.pi);
    //console.log(particle.speed);

    const omega: number = v_norm * math.sin(alpha) / r_norm;

    return math.abs(omega);
  }





}
