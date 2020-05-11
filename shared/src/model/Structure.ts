import {Vector2} from "../util/VectorInterface";

export class Structure {
  public id: string;
  public position: Vector2;
  public type: string;
  public activationDuration: number = 4;
  public activationRange: number = 300;

  constructor(x: number, y: number) {
    this.position = {
      x: x,
      y: y
    };
    this.type = "structure";
  }
}
