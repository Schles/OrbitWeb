import { StructureEntity } from '../../../../../libs/game-logic/src/lib/model/StructureEntity';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { Inventory, Server } from '@orbitweb/common';

@Server("STRUCTURE", "Loot")
export class StructureLootEntity extends StructureEntity {
  constructor(x: number, y: number, public inventory: Inventory[]) {
    super(x, y);
    this.type = 'Loot';
    this.activationRange = 20;
  }

  onActivateStructure(user: SpaceshipEntity) {
    super.onActivateStructure(user);

    user.inventory = this.inventory.reduce((acc, cur) => {
      let loot = acc.find((l) => l.name === cur.name);

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
