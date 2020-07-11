import {StructureEntity} from "../../model/StructureEntity";
import {SpaceshipEntity} from "../../model/SpaceshipEntity";
import {Inventory} from "../../../../../shared/src/model/Inventory";

export class StructureLootEntity extends StructureEntity {
  constructor(x: number, y: number, public inventory: Inventory[]) {
    super(x, y);
    this.type = "Loot";
    this.activationRange = 20;
  }


  onActivateStructure(user: SpaceshipEntity) {
    super.onActivateStructure(user);

    user.inventory = this.inventory.reduce( (acc, cur) => {
      let loot = acc.find( (l) => l.name === cur.name);

      if (loot === undefined) {
        loot = new Inventory(cur.name);
        acc.push(loot);
      }

      loot.amount += cur.amount;

      return acc;
    }, user.inventory);

    this.destroy = true;
  }
}
