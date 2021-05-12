import { GameIterable, GameManager, Message, Spaceship } from '@orbitweb/common';
import { ProjectileGO, SpaceshipGO, StructureGO } from '@orbitweb/game-objects';
import { Camera, World } from '@orbitweb/renderer';
import { WorldGOBoundry } from '../entity/world/WorldGOBoundry';
import { WorldGOSun } from '../entity/world/WorldGOSun';
import { TargetOrbitContainer } from '../ui/TargetOrbitContainer';
import { EventManager } from './EventManager';
import { InputManager } from './InputManager';
import { NetworkManager } from './NetworkManager';
import { ShaderManager } from './ShaderManager';


export class GameManagerClient extends GameManager {
  public players: SpaceshipGO[] = [];
  public projectiles: ProjectileGO[] = [];
  public structures: StructureGO[] = [];
  public skills: any[] = [];

  public postShaderLoaded() {}


  public renderer: World;

  public sun: WorldGOSun;
  public boundry: WorldGOBoundry;

  private _camera: Camera;

  public send: (msg: Message) => void;

  private _playerLocal: SpaceshipGO;
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

  public set playerLocal(val: SpaceshipGO) {
    this._playerLocal = val;
    this.orbitContainer.setSource(this._playerLocal);
  }

  public get playerLocal(): SpaceshipGO {
    return this._playerLocal;
  }

  public get username(): string {
    return this._username;
  }

  public orbitContainer: TargetOrbitContainer;

  constructor(options) {
    //super(options);
    super();
    this.renderer = new World(options);

    this.eventManager = new EventManager();
    this.networkManager = new NetworkManager(this);
    this.inputManager = new InputManager(this);
    this.shaderManager = new ShaderManager(this);

    this.onInitGame();
  }

  public onInitGame() {
    this.boundry = new WorldGOBoundry();
    this.renderer.gameStage.addChild(this.boundry.gameObject);

    this.camera = new Camera(this.renderer.foregroundStage);
  }

  public initWorld() {
    this.renderer.initWorld();
  }

  public iterate(delta: number) {
    this.renderer.emitter.emit([...this.players, ...this.projectiles]);
    this.renderer.emitter.update(delta);

    [...this.players, ...this.projectiles, ...this.structures].forEach(
      (gameIter: GameIterable) => {
        gameIter.iterate(delta);
      }
    );

    this.camera.iterate(
      this.players.map((v) => v.position),
      delta
    );
  }

  public toLocal(point) {
    return this.renderer.foregroundStage.toLocal(point);
  }

  public clear() {
    const players: SpaceshipGO[] = this.players.map((p) => p);

    players.forEach((p) => {
      //this.killPlayer(p);
      //TODO!
    });

    const projectiles: ProjectileGO[] = this.projectiles.map((p) => p);

    projectiles.forEach((p) => {
      //      this.destroyProjectile(p);
    });

    const structures: StructureGO[] = this.structures.map((p) => p);

    structures.forEach((structureGO) => {
      this.renderer.gameStage.removeChild(structureGO.gameObject);

      const p = this.structures.findIndex(
        (value) => value.id === structureGO.id
      );
      if (p !== undefined) {
        structureGO.onDestroy();
        this.structures.splice(p, 1);
      }
    });
  }
}
