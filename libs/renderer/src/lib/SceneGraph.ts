import {CMath} from "@orbitweb/common";

import {Emitter} from "./Emitter";
import {Camera} from "./renderer/Camera";
import {Vector2} from "@orbitweb/common";
import {EventEmitter} from "@angular/core";
import {BoundryGO} from "./model/BoundryGO"; 
import {AssetLoader} from "./util/AssetLoader";
import { Application } from "@pixi/app";
import { Container, Graphics, Text } from "pixi.js";

import { Viewport } from 'pixi-viewport';


export abstract class SceneGraph extends Application {

  public OnResizeWindow: EventEmitter<Vector2> = new EventEmitter<Vector2>();

  public emitter: Emitter;


  public boundry: BoundryGO;



  private _backgroundStage: Container;
  private _gameStage: Viewport;
  private _uiStage: Container;
  private _structureStage: Container;
  private _playerStage: Container;

  private renderSizePoint: Graphics;


  public assetLoader: AssetLoader;

  private depCamera: Camera;

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
    return this.depCamera;
  }

  public set camera(camera: Camera) {
    this.depCamera = camera;
  }

  constructor(options) {
    super(options);

    this.initScene();
    this.initWorld();
    this.initShader();
  }



  

  public abstract onLoaded(loader, res);

  public setRenderSize(x, y) {

    //this.renderSizePoint.x = x;
    //this.renderSizePoint.y = y;
  }

  public initScene() {
    console.log("initScene");


    this._backgroundStage = new Container(),

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
    //this.gameStage.addChild(this.boundry.gameObject);


    this.gameStage.drag()
      .pinch()
      .wheel()
      .decelerate();

  }

  public initWorld() {
    console.log("initWorld");

    this.boundry = new BoundryGO();

    this.emitter = new Emitter(1000);
    this.emitter.init();

    this.structureStage.addChild(this.emitter.getContainer());

  }

  private initShader() {
    this.assetLoader = new AssetLoader();
    this.assetLoader.load(this.loader);    
    AssetLoader.onLoaded.subscribe( (val) => { this.onLoaded(val.loader, val.res)});
  }
}
