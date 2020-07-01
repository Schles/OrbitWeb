import {SkillEntity} from "../../../server/src/entities/SkillEntity";
import {SpaceshipEntity} from "../../../server/src/entities/SpaceshipEntity";

export class TargetSkill extends SkillEntity {
  constructor(source: SpaceshipEntity, protected target: SpaceshipEntity) {
    super(source);
  }

}
