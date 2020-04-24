import {Message} from "./message";
import {Vector2} from "../../../../shared/src/util/VectorInterface";


export class SkillUsedMessage extends Message {
    constructor(public skillId: string, public source: string, public target: string, public targetPosition?: Vector2) {
      super();
      this.type = "skillUsedMessage";
    }
}
