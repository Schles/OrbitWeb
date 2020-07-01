import {ShipEquipment} from "../../../../shared/src/model/ShipEquipment";

export class FittingDB {
    public db: ShipEquipment[] = [];
    public desc: {name: string, desc: string}[] = [];



  constructor() {
    this.init();
    this.initDesc();
  }

  public init() {

      this.db.push(new ShipEquipment("Repair", 2, 10, 30, 15,false, {
        targetSelf: true
      }));

      this.db.push(new ShipEquipment("Webber", 2, 15, 10, 10,false,{
        targetEnemy: true
      }));

      this.db.push(new ShipEquipment("Laser", 1, 8, 20, 5,false,{
        targetEnemy: true
      }));

      this.db.push(new ShipEquipment("SpeedBooster", 2, 70, 30, 6, false,{
        targetSelf: true
      }));

      this.db.push(new ShipEquipment("RocketLauncher", 1, 5, 5, 2.5,false,{
        targetEnemy: true
      }));

      this.db.push(new ShipEquipment("Nosferatu", 1, 10, 60, 15,false,{
        targetEnemy: true
      }));

    this.db.push(new ShipEquipment("Battery", 3, 40, 0, 0,true,{}));
    this.db.push(new ShipEquipment("Mass", 3, 40, 0, 0,true,{}));

    }

    public initDesc() {
      this.desc.push( {name: "Repair", desc: "Self Heal for energy cost."})
      this.desc.push( {name: "Webber", desc: "Slows the target ship on activation."})
      this.desc.push( {name: "Laser", desc: "Shoots at the target. Needs to be in range and aligned for the shot."})
      this.desc.push( {name: "RocketLauncher", desc: "Fires rockets which follows the target. Explode after 10s or reached the target."})
      this.desc.push( {name: "SpeedBooster", desc: "Increased Speed for high energy cost."})
      this.desc.push( {name: "Webber", desc: "Slows the target."})
      this.desc.push( {name: "Nosferatu", desc: "Steals target energy."})
      this.desc.push( {name: "Battery", desc: "Highly increases energy regeneration!"});
      this.desc.push( {name: "Battery", desc: "Increases ship mass."});
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
          set.push(this.search("Mass"));
          break;
      }

      return set;
    }

    public getDescription(name: string): string {
      const d = this.desc.find ( (d) => d.name === name);

      if ( d === undefined) {
        return "Small description is following soon!";
      }

      return d.desc;
    }
}
