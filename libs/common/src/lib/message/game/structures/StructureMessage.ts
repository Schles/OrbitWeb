import {Message} from "../../Message";

export class StructureMessage extends Message{
  constructor(public id: string) {
    super();
    this.type = "structureMessage";
  }
}
