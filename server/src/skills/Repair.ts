import {TargetSkill} from "../../../shared/src/model/TargetSkill";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";

export class Repair extends TargetSkill {
  constructor(source: SpaceshipEntity, target: SpaceshipEntity) {
    super(source, target);

  }

  public iterate(delta: number) {
    super.iterate(delta);

    this.target.health += delta;
  }

}
