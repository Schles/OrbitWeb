import {SpaceshipGO} from "../game/gameobjects/SpaceshipGO";
import {Message} from "../../../../shared/src/message/Message";
import {PlayerActionMessage} from "../../../../shared/src/message/game/player/PlayerActionMessage";
import {ShipEquipment} from "../../../../shared/src/model/ShipEquipment";

export class CastSpell {
  public static castSpell(spaceship: SpaceshipGO, index: number): Message  {
      if ( spaceship.fitting !== undefined && spaceship.fitting.fitting.length > index) {

        const eq: ShipEquipment = spaceship.fitting.fitting[index];

        console.log("eq", eq);

        const msg = new PlayerActionMessage(spaceship.id, eq.name, eq.action);

        return msg;
      }

      return undefined;
  }
}
