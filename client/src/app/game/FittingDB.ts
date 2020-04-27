import {ShipEquipment} from "../../../../shared/src/model/ShipEquipment";
import {ShipFitting} from "../../../../shared/src/model/ShipFitting";

export class FittingDB {
    public db: ShipEquipment[] = [];


  constructor() {
    this.init();
  }

  public init() {

      this.db.push(new ShipEquipment("Repair", 0, 10, 30, 15,false, {
        targetSelf: true
      }));

      this.db.push(new ShipEquipment("Webber", 0, 15, 10, 10,false,{
        targetEnemy: true
      }));

      this.db.push(new ShipEquipment("Laser", 0, 8, 20, 5,false,{
        targetEnemy: true
      }));

      this.db.push(new ShipEquipment("SpeedBooster", 0, 70, 30, 6, false,{
        targetSelf: true
      }));

      this.db.push(new ShipEquipment("RocketLauncher", 0, 5, 5, 5,false,{
        targetEnemy: true
      }));

      this.db.push(new ShipEquipment("Nosferatu", 0, 10, 60, 15,false,{
        targetEnemy: true
      }));

    this.db.push(new ShipEquipment("Battery", 0, 40, 0, 0,true,{}));

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
          set.push(this.search("SpeedBooster"));
          set.push(this.search("RocketLauncher"));
          set.push(this.search("Nosferatu"));
          break;
      }

      return set;
    }
}
