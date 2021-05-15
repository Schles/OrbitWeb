import { AbstractPhysics } from './AbstractPhysics';
import { OrbitPhysics } from './physics/OrbitPhysics';

export class Physics {

  public playerPhysics: AbstractPhysics;
  public projectilePhysics: AbstractPhysics;

  constructor() {
    this.playerPhysics = new OrbitPhysics();
    this.projectilePhysics = new OrbitPhysics();
  }

}


