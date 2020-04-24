

export class Skill{
  public id;

  public name: string;
  protected animationDuration = 4.0;
  public remainingTime = 4.0;

  public onInit() {

  }

  public iterate(delta: number) {
      this.remainingTime -= delta;
  }

  public onDestroy() {

  }
}
