import {Message} from "./Message";

export class DebugMessage extends Message{
  constructor() {
    super();
    this.type = "debugMessage";
  }
}
