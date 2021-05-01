import {Skill} from "@orbitweb/common";
import {SpaceshipEntity} from "./SpaceshipEntity";

export class SkillEntity extends Skill {
    constructor(protected source: SpaceshipEntity) {
      super();
    }
}
