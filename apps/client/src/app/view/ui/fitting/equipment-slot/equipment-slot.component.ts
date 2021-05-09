import { Component, Input, OnInit } from '@angular/core';
import { ShipEquipment } from '@orbitweb/common';
import { GameService } from '../../../../service/game.service';

@Component({
  selector: 'app-equipment-slot',
  templateUrl: './equipment-slot.component.html',
  styleUrls: ['./equipment-slot.component.scss'],
})
export class EquipmentSlotComponent implements OnInit {
  @Input() public equipmentList: ShipEquipment[];

  public equipmentCPUCapacity: number = 200; // TODO

  public tierList: {
    tier: number;
    name: string;
    fitting: ShipEquipment[];
  }[] = [
    {
      tier: 1,
      name: 'Attack',
      fitting: [],
    },
    {
      tier: 2,
      name: 'Utility',
      fitting: [],
    },
    {
      tier: 3,
      name: 'Passive',
      fitting: [],
    },
  ];

  public addTier: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  public isValid(): boolean {
    return this.cpuCost <= this.equipmentCPUCapacity;
  }

  public getFitting(): ShipEquipment[] {
    return this.tierList.reduce((acc, cur) => {
      cur.fitting.forEach((fit) => {
        acc.push(fit);
      });
      return acc;
    }, []);
  }

  public get database(): ShipEquipment[] {
    return this.gameService.fittingDB.db;
  }

  public getDescription(name: string): string {
    return this.gameService.fittingDB.getDescription(name);
  }

  public getAllEquipment(tier: number): ShipEquipment[] {
    return this.database.filter((eq) => eq.tier === tier);
  }

  public getCPUP() {
    const p = (this.cpuCost * 100) / this.equipmentCPUCapacity;

    return p <= 100 ? p : 100;
  }

  public removeEquipment(
    equipment: ShipEquipment,
    tier: number,
    index: number
  ) {
    this.tierList.find((o) => o.tier === tier).fitting.splice(index, 1);
  }

  public addEquipment(equipment: ShipEquipment) {
    const list = this.tierList.find((tier) => tier.tier === equipment.tier);
    if (list !== undefined) {
      list.fitting.push(equipment);
      this.addTier = 0;
    }
  }

  public get cpuCost() {
    return this.tierList.reduce((acc, cur) => {
      acc += cur.fitting.reduce((a, c) => {
        a += c.cpuCost;
        return a;
      }, 0);
      return acc;
    }, 0);
  }
}
