import { Component, Input, OnInit } from '@angular/core';
import { AssetManager, ShipEquipment, ShipEquipmentDB, ShipEquipmentDBMeta } from '@orbitweb/common';
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
    fitting: ShipEquipmentDB[];
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
        acc.push(AssetManager.dirtyFactory(cur.tier, fit));
      });
      return acc;
    }, []);
  }


  public getDescription(tier: number, name: string): ShipEquipmentDBMeta {
    
    return AssetManager.getShipEquipmentMeta(tier, name);
  }

  public getAllEquipment(tier: number): ShipEquipmentDB[] {
    return AssetManager.getShipEquipment(tier);
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

  public addEquipment(tier: number, equipment: ShipEquipmentDB) {
    const list = this.tierList.find((i) => i.tier === tier);
    console.log("list", tier);
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
