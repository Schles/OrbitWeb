import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() maxValue: number = 100;
  public _currentValue: number = 40;
  @Input() public set currentValue(val: number) {
    this._currentValue = val;

    const p = val * 100 / this.maxValue;
    this.pValue = p <= 100 ? p : 100;
  }

  public pValue: number;

  constructor() { }

  ngOnInit() {
  }

}
