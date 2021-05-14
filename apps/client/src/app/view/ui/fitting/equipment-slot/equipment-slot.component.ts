import { Component, Input, OnInit } from '@angular/core';
import {
  AssetManager,
  ShipEquipment,
  ShipEquipmentDB,
  ShipEquipmentDBMeta,
} from '@orbitweb/common';
import { GameService } from '../../../../service/game.service';

@Component({
  selector: 'app-equipment-slot',
  templateUrl: './equipment-slot.component.html',
  styleUrls: ['./equipment-slot.component.scss'],
})
export class EquipmentSlotComponent implements OnInit {
  @Input() public equipmentList: ShipEquipment[];

  public equipmentCPUCapacity: number = 200; // TODO

  public showTooltipFor: ShipEquipmentDB;

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

  ngOnInit() {

    if ( AssetManager.config.debug) {

    }

    this.tierList = this.tierList.map( tl => {
      const eq = AssetManager.getShipEquipment(tl.tier)[0];

      if (eq)
        tl.fitting.push(eq);

      return tl;
    });

  }

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


  public getAllEquipment(tier: number): ShipEquipmentDB[] {
    return AssetManager.getShipEquipment(tier);
  }

  public getCPUP() {
    const p = (this.cpuCost * 100) / this.equipmentCPUCapacity;

    return p <= 100 ? p : 100;
  }

  public addEquipment(tier: number, equipment: ShipEquipmentDB) {
    const list = this.tierList.find((i) => i.tier === tier);
    if (list !== undefined) {
      list.fitting = [equipment];
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

  public isAllowedToAddMore(tier: number): boolean {
    if (tier === 1) return this.tierList[0].fitting.length < 1;
    else if (tier === 2) return this.tierList[1].fitting.length < 2;
    else return false;
  }

  isCurrentlyEquipped(tier: number, equipment: ShipEquipmentDB) {
    return this.tierList.find( (t) => t.tier === tier).fitting.findIndex( ( fit) => fit.name === equipment.name) >= 0
  }

  public onHover(item) {
    this.showTooltipFor = item;
  }
}
