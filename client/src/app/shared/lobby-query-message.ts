import {Message} from "./message";

export class LobbyQueryMessage extends Message {



    constructor() {
      super();
      this.type = "lobbyQueryMessage";
    }
}
