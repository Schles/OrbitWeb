export class ScalingValue {
  private baseValue: number;

  private factor: number = 1;
  private addValue: number = 0;

  constructor(baseValue: number) {
    this.baseValue = baseValue;
  }


  public get value(): number {
    return this.baseValue * this.factor + this.addValue;
  }

  public incAmount(val: number) { this.addValue += val; }
  public decAmount(val: number) { this.addValue -= val; }

  public incFactorAdd(val: number) { this.factor += val - 1;}
  public decFactorAdd(val: number) { this.factor -= val - 1;}

  public incFactorMulti(val: number) {}
  public decFactorMulti(val: number) {}


  public set value(val: number) {
    this.baseValue = val;
  }
}