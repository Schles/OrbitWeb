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
    max: number;
    fitting: ShipEquipmentDB[];
  }[] = [
    {
      tier: 1,
      name: 'Attack',
      max: 1,
      fitting: [],
    },
    {
      tier: 2,
      name: 'Utility',
      max: 2,
      fitting: [],
    },
    {
      tier: 3,
      max: 1,
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


  public addEquipment(tier: number, equipment: ShipEquipmentDB) {
    const list = this.tierList.find((i) => i.tier === tier);

    const equipedIndex = list.fitting.findIndex( ( fit) => fit.name === equipment.name);

    if ( equipedIndex >= 0) {
      list.fitting.splice(equipedIndex, 1);
    } else {
      list.fitting.push(equipment);

      if (list.fitting.length > list.max)
        list.fitting.shift();
    }


      this.addTier = 0;

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
