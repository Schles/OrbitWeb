import {Camera} from "./renderer/Camera";
import {Vector2} from "@orbitweb/common";
import {EventEmitter} from "@angular/core";
import {AssetLoader} from "./util/AssetLoader";
import { Application } from "@pixi/app";
import { Container } from "pixi.js";

import { Viewport } from 'pixi-viewport';


export abstract class SceneGraph extends Application {

  public OnResizeWindow: EventEmitter<Vector2> = new EventEmitter<Vector2>();

  private _backgroundStage: Container;
  private _gameStage: Viewport;
  private _uiStage: Container;
  private _structureStage: Container;
  private _playerStage: Container;
  private _camera: Camera;
  public assetLoader: AssetLoader;

  

  public get backgroundStage(): Container {
    return this._backgroundStage;
  }

  public get gameStage(): Viewport {
    return this._gameStage;
  }

  public get playerStage(): Container {
    return this._playerStage;
  }

  public get uiStage(): Container {
    return this._uiStage;
  }

  public get structureStage(): Container {
    return this._structureStage;
  }

  public get camera(): Camera {
    return this._camera;
  }

  public set camera(camera: Camera) {
    this._camera = camera;
  }

  constructor(options) {
    super(options);

    this.initScene();
    this.initShader();
  }


  public abstract onShaderLoaded(loader, res);

  public initScene() {
    console.log("initScene");
    this._backgroundStage = new Container();

    this._gameStage = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,
  
      interaction: this.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    this._uiStage = new Container();
    this._structureStage = new Container();
    this._playerStage = new Container();

    this.stage.addChild(this._backgroundStage);
    this.stage.addChild(this.gameStage);
    this.stage.addChild(this.uiStage);


    this.gameStage.addChild(this.structureStage);
    this.gameStage.addChild(this.playerStage);

    this.gameStage.drag()
      .pinch()
      .wheel()
      .decelerate();

  }

  private initShader() {
    this.assetLoader = new AssetLoader();
    this.assetLoader.load(this.loader);    
    AssetLoader.onLoaded.subscribe( (val) => { this.onShaderLoaded(val.loader, val.res)});
  }
}
