import {Message} from "../Message";
import {PlayerJoinedMessage} from "./player/PlayerJoinedMessage";
import {Spaceship} from "../../model/Spaceship";


export class EnemySpawnMessage extends Message {

  constructor(private name: string) {
    super();
    //this.fitting.fitting = spaceship.fitting.fitting;

    this.type = "enemyJoinedMessage";
  }
}
