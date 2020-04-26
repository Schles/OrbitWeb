import {ShipEquipment} from "../../../../shared/src/model/ShipEquipment";
import {ShipFitting} from "../../../../shared/src/model/ShipFitting";

export class FittingDB {
    public db: ShipEquipment[] = [];


  constructor() {
    this.init();
  }

  public init() {

      this.db.push(new ShipEquipment("Repair", 0, 10, 10, 2,false, {
        targetSelf: true
      }));

      this.db.push(new ShipEquipment("Webber", 0, 100, 10, 3,false,{
        targetEnemy: true
      }));

      this.db.push(new ShipEquipment("Laser", 0, 100, 20, 2,false,{
        targetEnemy: true
      }));

      this.db.push(new ShipEquipment("SpeedBooster", 0, 100, 30, 5, false,{
        targetSelf: true
      }));

      this.db.push(new ShipEquipment("RocketLauncher", 0, 100, 5, 5,false,{
        targetEnemy: true
      }));

      this.db.push(new ShipEquipment("Battery", 0, 100, 0, 0,true,{}));

    }

    public search(name: string): ShipEquipment {
      return this.db.find( (eq) => eq.name === name);
    }

    public getSet(name: string): ShipEquipment[] {
      const set: ShipEquipment[] = [];
      switch(name) {
        case "default":
          set.push(this.search("Repair"));
          set.push(this.search("Webber"));
          set.push(this.search("Laser"));
          set.push(this.search("RocketLauncher"));
          set.push(this.search("Battery"));
          break;
      }

      return set;
    }
}
