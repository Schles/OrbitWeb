import { Component, Input, OnInit } from '@angular/core';
import { ShipEquipment } from '@orbitweb/common';

@Component({
  selector: 'app-equipment-window',
  templateUrl: './equipment-window.component.html',
  styleUrls: ['./equipment-window.component.scss'],
})
export class EquipmentWindowComponent implements OnInit {
  @Input() public equipment: ShipEquipment;
  @Input() public description: string;

  constructor() {}

  ngOnInit() {}
}
