
import {StructureEntity} from "./StructureEntity";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";
import {Scoreboard} from "../game/Scoreboard";

export class StructurePortalEntity extends StructureEntity {
  constructor(x: number, y: number, public scoreboard: Scoreboard) {
    super(x, y);
    this.type = "Portal";
    this.activationRange = 30;
    this.activationDuration = 30;
  }


  onActivateStructure(user: SpaceshipEntity) {
    super.onActivateStructure(user);
    user.lastHitBy = user;
    user.health = 0;
    user.silentRemove = true;

    this.scoreboard.depositLoot(user.id, user.inventory);
  }
}
