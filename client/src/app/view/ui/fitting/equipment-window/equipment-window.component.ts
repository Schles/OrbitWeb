import {Component, Input, OnInit} from '@angular/core';
import {ShipEquipment} from "../../../../../../../shared/src/model/ShipEquipment";

@Component({
  selector: 'app-equipment-window',
  templateUrl: './equipment-window.component.html',
  styleUrls: ['./equipment-window.component.scss']
})
export class EquipmentWindowComponent implements OnInit {

  @Input() public equipment: ShipEquipment;

  constructor() { }

  ngOnInit() {
  }

}
