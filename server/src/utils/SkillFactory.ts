import {TargetSkill} from "../../../shared/src/model/TargetSkill";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";
import {Repair} from "../skills/Repair";

export class SkillFactory {
  public static createTargetSkill(name: string, source: SpaceshipEntity, target: SpaceshipEntity): TargetSkill {
    switch (name) {
      case "repair":
        return new Repair(source, target);

    }

    return new Repair(source, target);;

  }
}
