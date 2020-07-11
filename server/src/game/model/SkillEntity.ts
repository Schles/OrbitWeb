import {Skill} from "../../../../shared/src/model/Skill";
import {SpaceshipEntity} from "./SpaceshipEntity";

export class SkillEntity extends Skill {
    constructor(protected source: SpaceshipEntity) {
      super();
    }
}
