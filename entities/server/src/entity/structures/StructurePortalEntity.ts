import { StructureEntity } from '../../../../../libs/game-logic/src/lib/model/StructureEntity';
import { SpaceshipEntity } from '../../../../../libs/game-logic/src/lib/model/SpaceshipEntity';
import { Scoreboard } from '../../../../../libs/game-logic/src/lib/core/Scoreboard';
import { Server } from '@orbitweb/common';

@Server("STRUCTURE", "Portal")
export class StructurePortalEntity extends StructureEntity {
  constructor(x: number, y: number, public scoreboard: Scoreboard) {
    super(x, y);
    this.type = 'Portal';
    this.activationRange = 30;
    this.activationDuration = 30;
    this.isStatic = true;
  }

  onActivateStructure(user: SpaceshipEntity) {
    super.onActivateStructure(user);
    user.lastHitBy = user;
    user.health = 0;
    user.silentRemove = true;

    this.scoreboard.depositLoot(user.id, user.inventory);
  }
}
