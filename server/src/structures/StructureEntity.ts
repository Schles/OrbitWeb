import {Structure} from "../../../shared/src/model/Structure";
import {SpaceshipEntity} from "../entities/SpaceshipEntity";

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
