import {Structure} from "@orbitweb/common";
import {SpaceshipEntity} from "./SpaceshipEntity";

export class StructureEntity extends Structure {
  public destroy: boolean = false;

  constructor(x: number, y: number) {
    super(x, y);
  }

  public onActivateStructure(user: SpaceshipEntity) {

  }

  public onDestroy() {

  }
}
