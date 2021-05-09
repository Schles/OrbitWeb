import { Component, Input, OnInit } from '@angular/core';
import { ShipEquipmentDB, ShipEquipmentDBMeta } from '@orbitweb/common';

@Component({
  selector: 'app-equipment-window',
  templateUrl: './equipment-window.component.html',
  styleUrls: ['./equipment-window.component.scss'],
})
export class EquipmentWindowComponent implements OnInit {
  @Input() public equipment: ShipEquipmentDB;
  @Input() public description: ShipEquipmentDBMeta;

  constructor() {}

  ngOnInit() {}
}
