import {Message} from "./message";
import {DamageMessage} from "./damage-message";

export class KillingBlowMessage extends DamageMessage {



  constructor(public origin: string,
              public target: string,
              public damage: number) {
      super(origin, target, damage);
      this.type = "killingBlowMessage";
    }
}
