import {SkillEntity} from "../../../server/src/game/model/SkillEntity";
import {SpaceshipEntity} from "../../../server/src/game/model/SpaceshipEntity";

export class TargetSkill extends SkillEntity {
  constructor(source: SpaceshipEntity, protected target: SpaceshipEntity) {
    super(source);
  }

}
