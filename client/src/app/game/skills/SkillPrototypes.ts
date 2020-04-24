import {Repair} from "./Repair";
import {SpaceshipGO} from "../gameobjects/SpaceshipGO";
import {SkillGO} from "../gameobjects/SkillGO";

export class SkillPrototypes {

  public static OnTargetSkillUsedMessage(name: string, source: SpaceshipGO, target: SpaceshipGO): SkillGO {
    switch( name ) {
      case "repair":
        return new Repair(source, target);
        break;
      default:
        return undefined;
    }

  }
}
