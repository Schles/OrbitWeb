import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../../service/game.service';
import { AssetManager, ShipEquipmentDB, ShipFitting } from '@orbitweb/common';
import { ShipEquipment } from '@orbitweb/common';
import { FormControl, FormGroup } from '@angular/forms';
import { PlayerService } from '../../../service/player.service';


type Pair = { key: string, value: string};

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {

  private _item: ShipEquipmentDB;

  @Input() public set item(value: ShipEquipmentDB) {
    this._item = value;
    this.props = this.flatten(this._item);
  }


  public props: Pair[] = [];

    constructor() {
    }

  public flatten(item: ShipEquipmentDB): any {
    const res = [];

    res.push(...this.step(item));

    return res;
  }

  public step(object: any): Pair[] {
      const res: Pair[] = [];

    for ( let key of Object.keys(object)) {
      if ( object[key] instanceof String || typeof object[key] === 'string'
        || object[key] instanceof Number || typeof object[key] === 'number'
        || object[key] instanceof Boolean || typeof object[key] === 'boolean') {
        res.push({
          key: key,
          value: object[key]
        })
      } else if ( object[key] instanceof Object || typeof object[key] === 'object' ) {
        res.push(...this.step(object[key]));
      }
    }

    return res;
  }


}
