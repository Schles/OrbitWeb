import {Injectable} from '@angular/core';
import {SpaceShooter} from "@orbitweb/renderer";
import {Message} from "@orbitweb/common";


import {GameService} from "./game.service";

import {ClientMessageRecieved} from '@orbitweb/game-objects';
import {MessageDeserializer} from '@orbitweb/game-objects';



@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private gameService: GameService) {
    this.gameService.onMessage.subscribe( (msg: Message) => {
      this.parseMessage(msg, this.gameService.app());
    });
  }

  public parseMessage(message: Message, app: SpaceShooter) {
    const msg: ClientMessageRecieved<any> = MessageDeserializer.deserialize(message);
    if ( msg !== undefined) {
      msg.onRecieve(app);
    }
  }

}
