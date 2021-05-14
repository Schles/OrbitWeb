import { GameLogic } from '../GameLogic';
import { SpaceshipEntity } from '../model/SpaceshipEntity';
import { ScoreboardUpdateMessage } from '@orbitweb/common';
import { Message } from '@orbitweb/common';
import { PlayerKilledMessage } from '@orbitweb/common';
import { Inventory } from '@orbitweb/common';
import { ShipEquipment } from '@orbitweb/common';
import { StructureLootEntity } from '../entity/structures/StructureLootEntity';
import { StructureSpawnMessage } from '@orbitweb/common';
import { SkillEntity } from '../model/SkillEntity';
import { ProjectileEntity } from '../model/ProjectileEntity';
import { ProjectileDestroyMessage } from '@orbitweb/common';
import { StructureEntity } from '../model/StructureEntity';
import { StructureDestroyMessage } from '@orbitweb/common';
import { EventLogMessage } from '../../../../common/src/lib/message/game/player/EventLogMessage';

export class GarbageCollector {
  public static execute(context: GameLogic) {
    this.gcPlayer(context);
    this.gcProjectile(context);
    this.gcStructure(context);
    this.gcSkill(context);
  }

  public static gcPlayer(context: GameLogic) {
    const now: number = new Date().getTime();
    // Player
    const removePlayer: SpaceshipEntity[] = [];

    context.players.forEach((player: SpaceshipEntity) => {
      if (player.health <= 0) {
        removePlayer.push(player);
      } else if (!player.isNPC) {
        const lastPlayerAction = player.timestampLastActionMs
          ? player.timestampLastActionMs
          : 0;
        const timeSinceLastAction = now - lastPlayerAction;

        if (timeSinceLastAction > player.maxIdleTimeMs) {
          player.silentRemove = true;
          removePlayer.push(player);
        }
      }
    });

    removePlayer.forEach((value: SpaceshipEntity) => {
      const msgSB = new ScoreboardUpdateMessage(context.scoreboard.scoreboard);
      context.send(msgSB);

      const msg: Message = new PlayerKilledMessage(value, undefined);
      context.send(msg);
console.log(value);
      const eventLog = new EventLogMessage("PLAYER_KILLED", {victim: value.id, killer: value.lastHitBy?.id});
      context.send(eventLog);


      if (!value.silentRemove) {
        const inventoryLoot = value.inventory;
        const fittingLoot = value.fitting.fitting.reduce(
          (acc: Inventory[], cur: ShipEquipment) => {
            if (cur.name !== 'Empty') {
              const inventory = new Inventory(cur.name);
              inventory.amount = 1;
              acc.push(inventory);
            }

            return acc;
          },
          []
        );

        const inventory: Inventory[] = inventoryLoot
          .concat(fittingLoot)
          .reduce((acc: Inventory[], cur) => {
            let loot = acc.find((l) => l.name === cur.name);

            if (loot === undefined) {
              loot = new Inventory(cur.name);
              acc.push(loot);
            }

            loot.amount += cur.amount;

            return acc;
          }, []);

        const lootStructure = new StructureLootEntity(
          value.position.x,
          value.position.y,
          inventory
        );
        lootStructure.id = '' + context.getUniqueId();
        lootStructure.info = value.id;
        lootStructure.timestampSpawnMs = now;
        context.structures.push(lootStructure);

        const loot: Message = new StructureSpawnMessage(lootStructure);
        context.send(loot);
      }

      context.players.forEach((value1) => {
        if (
          value1.targetPlayer !== undefined &&
          value1.targetPlayer.id === value.id
        )
          value1.targetPlayer = undefined;
      });

      const index = context.players.findIndex(
        (value1) => value1.id === value.id
      );
      context.players[index].onDestroy();
      context.players.splice(index, 1);
    });
  }

  public static gcProjectile(context: GameLogic) {
    // Projectiles
    const removeProjectiles: ProjectileEntity[] = [];

    context.projectiles.forEach((value: ProjectileEntity) => {
      if (value.timeToLife <= 0) removeProjectiles.push(value);
    });

    removeProjectiles.forEach((value) => {
      const index = context.projectiles.findIndex(
        (value1) => value1.id === value.id
      );
      context.projectiles[index].onDestroy();
      context.projectiles.splice(index, 1);

      const msg = new ProjectileDestroyMessage(value);
      context.send(msg);
    });
  }

  public static gcStructure(context: GameLogic) {
    const now: number = new Date().getTime();

    // Structures
    const removeStructures: StructureEntity[] = [];

    context.structures.forEach((structure: StructureEntity) => {
      if (structure.destroy) removeStructures.push(structure);
      else if (!structure.isStatic) {
        const spawnTime = structure.timestampSpawnMs
          ? structure.timestampSpawnMs
          : 0;
        const timeSinceSpawn = now - spawnTime;

        if (timeSinceSpawn > structure.maxIdleTimeMs) {
          removeStructures.push(structure);
        }
      }
    });

    removeStructures.forEach((value: StructureEntity) => {
      const index = context.structures.findIndex(
        (value1) => value1.id === value.id
      );
      //context.structures[index].onDestroy(); // TODO
      context.structures.splice(index, 1);

      context.players.forEach((player) => {
        if (
          player.targetStructure !== undefined &&
          player.targetStructure.id === value.id
        ) {
          player.targetStructure = undefined;
          player.actionUseStructure = false;
        }
      });

      const msg = new StructureDestroyMessage(value);
      context.send(msg);
    });
  }

  public static gcSkill(context: GameLogic) {
    // Skills
    const removeSkills: SkillEntity[] = [];

    context.skills.forEach((skill: SkillEntity) => {
      if (skill.remainingTime < 0) removeSkills.push(skill);
    });

    removeSkills.forEach((value) => {
      const index = context.skills.findIndex(
        (value1) => value1.id === value.id
      );
      context.skills[index].onDestroy();
      context.skills.splice(index, 1);
    });
  }
}
