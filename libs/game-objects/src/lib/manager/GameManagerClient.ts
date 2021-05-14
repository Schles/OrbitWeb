import {
  AssetManager,
  GameIterable,
  GameManager,
  Message,
  PlayerKilledMessage,
  ProjectileDestroyMessage,
  Spaceship, StructureDestroyMessage
} from '@orbitweb/common';
import { ProjectileGO, SpaceshipGO, StructureGO } from '@orbitweb/game-objects';
import { Camera, World } from '@orbitweb/renderer';
import { WorldGOArena } from '../entity/world/WorldGOArena';
import { WorldGOSun } from '../entity/world/WorldGOSun';
import { TargetOrbitContainer } from '../ui/TargetOrbitContainer';
import { EventManager } from '../../../../common/src/lib/manager/EventManager';
import { InputManager } from './InputManager';
import { NetworkManager } from './NetworkManager';
import { ShaderManager } from './ShaderManager';
import { FXEffect } from '../../../../renderer/src/lib/fx/Effect';



export class GameManagerClient extends GameManager {
  public players: SpaceshipGO[] = [];
  public projectiles: ProjectileGO[] = [];
  public structures: StructureGO[] = [];
  public fxEfects: FXEffect[] = [];
  public skills: any[] = [];

  public postShaderLoaded() {}

  public renderer: World;

  public sun: WorldGOSun;
  public goArena: WorldGOArena;

  private _camera: Camera;

  public send: (msg: Message) => void;

  private _playerLocal: SpaceshipGO;
  protected _username: string;

  public inputManager: InputManager;
  public networkManager: NetworkManager;
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

    this.networkManager = new NetworkManager(this);
    this.inputManager = new InputManager(this);
    this.shaderManager = new ShaderManager(this);


    this.onInitGame();
  }

  public onInitGame() {
    this.goArena = new WorldGOArena();
    this.renderer.backgroundStage.addChild(this.goArena.gameObject);



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

    this.fxEfects.forEach( (effect) => {
      effect.iterate(delta);
    })

    this.fxEfects.filter( (effect) => effect.timeToLife <= 0).forEach( (effect) => {
      this.renderer.fxStage.removeChild(effect.gameObject);

    });

    this.fxEfects = this.fxEfects.filter( (effect) => effect.timeToLife > 0);

    this.camera.iterate(
      this.players.map((v) => v.position),
      delta
    );
  }

  public toLocal(point) {
    return this.renderer.foregroundStage.toLocal(point);
  }

  public toGlobal(point) {
    return this.renderer.foregroundStage.toGlobal(point);
  }

  public clear() {
    const players: SpaceshipGO[] = this.players.map((p) => p);
    players.forEach((p) => {
      this.networkManager.onMessage.emit(new PlayerKilledMessage(p, undefined));
    });

    const projectiles: ProjectileGO[] = this.projectiles.map((p) => p);
    projectiles.forEach((p) => {
      this.networkManager.onMessage.emit(new ProjectileDestroyMessage(p));
    });

    const structures: StructureGO[] = this.structures.map((p) => p);
    structures.forEach((p) => {
      this.networkManager.onMessage.emit(new StructureDestroyMessage(p));
    });
  }

  public rerenderArena() {
    const globalPoint = this.toGlobal({x:0, y:0});
    this.goArena.setSize(globalPoint, AssetManager.config.world);
  }

}
