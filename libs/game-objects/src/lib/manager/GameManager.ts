import { GameIterable, Message } from "@orbitweb/common";
import { ProjectileGO, SpaceshipGO, StructureGO } from "@orbitweb/game-objects";
import { Camera, World } from "@orbitweb/renderer";
import { WorldGOBoundry } from "../entity/world/WorldGOBoundry";
import { WorldGOSun } from "../entity/world/WorldGOSun";
import { EventManager } from "./EventManager";
import { InputManager } from "./InputManager";
import { NetworkManager } from "./NetworkManager";
import { ShaderManager } from "./ShaderManager";



export class GameManager extends World {

  public players: SpaceshipGO[] = [];
  public projectiles: ProjectileGO[] = [];
  public structures: StructureGO[] = [];
  public skills: any[] = [];

  public sun: WorldGOSun;
  public boundry: WorldGOBoundry;

  private _camera: Camera;

  public send: (msg: Message) => void;

  public playerLocal: SpaceshipGO;
  protected _username: string;

  public inputManager: InputManager;
  public networkManager: NetworkManager;
  public eventManager: EventManager;
  public shaderManager: ShaderManager;


  public get camera(): Camera {
    return this._camera;
  }

  public set camera(camera: Camera) {
    this._camera = camera;
  }

  public set username(value: string) {
    this._username = value;

    if (this._username === undefined) {
      this.playerLocal = undefined;
    }

    this.playerLocal = this.players.find((p) => p.id === this._username);
  }

  public get username(): string {
    return this._username;
  }

  constructor(options) {
    super(options);

    this.eventManager = new EventManager();
    this.networkManager = new NetworkManager(this);
    this.inputManager = new InputManager(this);
    this.shaderManager = new ShaderManager(this);


    this.onInitGame();
  }

  public onInitGame() {
    this.boundry = new WorldGOBoundry();
    this.gameStage.addChild(this.boundry.gameObject);
    
    this.camera = new Camera(this.foregroundStage);
  }

  public initWorld() {

    this.sun = new WorldGOSun(this.backgroundStage);

    super.initWorld();
  }

  public iterate(delta: number) {
    this.sun.iterate(delta);

    this.emitter.emit([...this.players, ...this.projectiles]);
    this.emitter.update(delta);

    [... this.players, ...this.projectiles, ...this.structures].forEach ( (gameIter: GameIterable) => {
      gameIter.iterate(delta);
    });

    this.camera.iterate(this.players.map((v) => v.position), delta);
    
  }

  public toLocal(point) {
    return this.foregroundStage.toLocal(point);
  }


  public clear() {
    const players: SpaceshipGO[] = this.players.map(p => p);

    players.forEach((p) => {
      //this.killPlayer(p);
      //TODO!
    });

    const projectiles: ProjectileGO[] = this.projectiles.map(p => p);

    projectiles.forEach((p) => {
//      this.destroyProjectile(p);
    });

    const structures: StructureGO[] = this.structures.map(p => p);

    structures.forEach((structureGO) => {
      this.gameStage.removeChild(structureGO.gameObject);

      const p = this.structures.findIndex(value => value.id === structureGO.id);
      if (p !== undefined) {
        structureGO.onDestroy();
        this.structures.splice(p, 1);
      }
    });

  }



}