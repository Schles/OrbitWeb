import {CMath} from "@orbitweb/common";

import {Emitter} from "./Emitter";
import {Camera} from "./renderer/Camera";
import {SunGameObject} from "./model/Sun";
import {Vector2} from "@orbitweb/common";
import {EventEmitter} from "@angular/core";
import {BoundryGO} from "./model/BoundryGO"; 
import {AssetLoader} from "./util/AssetLoader";
import { Application } from "@pixi/app";
import { Container, Graphics, Text } from "pixi.js";
//import * as PIXI from "pixi.js"




export abstract class World extends Application {

  public OnResizeWindow: EventEmitter<Vector2> = new EventEmitter<Vector2>();


  public emitter: Emitter;

  public targeting;
  public targetingLine;
  public targetingLine2: Graphics;
  public targetingText;

  public boundry: BoundryGO;

  public targetingCircle: Graphics;

  private _gameStage: Container;
  private _uiStage: Container;


  public sunGameObject: SunGameObject;

  private _structureStage: Container;
  private _playerStage: Container;


  public assetLoader: AssetLoader;

  public depCamera: Camera;


  public get gameStage(): Container {
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

  constructor(options) {
    super(options);

    this.initWorld();
  }



  private renderSizePoint: Graphics;

  public abstract onLoaded(loader, res);

  public setRenderSize(x, y) {

    //this.renderSizePoint.x = x;
    //this.renderSizePoint.y = y;
  }

  public initWorld() {
    console.log("initWorld");

    this._gameStage = new Container();
    this._uiStage = new Container();
    this._structureStage = new Container();
    this._playerStage = new Container();

    this.boundry = new BoundryGO();


    this.stage.addChild(this.gameStage);
    this.stage.addChild(this.uiStage);


    this.gameStage.addChild(this.structureStage);
    this.gameStage.addChild(this.playerStage);
    this.gameStage.addChild(this.boundry.gameObject);


    this.emitter = new Emitter(1000);
    this.emitter.init();


    this.structureStage.addChild(this.emitter.getContainer());

    this.assetLoader = new AssetLoader();
    this.assetLoader.load(this.loader);    
    AssetLoader.onLoaded.subscribe( (val) => { this.onLoaded(val.loader, val.res)});


    this.targeting = new Container();
    this.targetingLine = new Graphics();
    this.targetingLine2 = new Graphics();
    this.targetingCircle = new Graphics();


    this.targeting.addChild(this.targetingLine);
    this.targeting.addChild(this.targetingLine2);
    this.targeting.addChild(this.targetingCircle);


    this.targetingText = new Text("", {fontFamily : 'Arial', fontSize: 10, fill : 0xff1010, align : 'center'});

    this.targeting.addChild(this.targetingText);

    this.sunGameObject = new SunGameObject(this.gameStage);

  }

  public drawCross(container: Graphics, pos: Vector2) {
    container.clear();

    const width = 5;

    const p1: Vector2 = CMath.add(pos, CMath.scale({x: 1, y: 1}, width));
    const p2: Vector2 = CMath.add(pos, CMath.scale({x: -1, y: -1}, width));

    const p3: Vector2 = CMath.add(pos, CMath.scale({x: -1, y: 1}, width));
    const p4: Vector2 = CMath.add(pos, CMath.scale({x: 1, y: -1}, width));


    container.lineStyle(1, 0xFFFFFF, 0.5);
    container.moveTo(p1.x, p1.y);
    container.lineTo(p2.x, p2.y);

    container.moveTo(p3.x, p3.y);
    container.lineTo(p4.x, p4.y);
  }

  public drawLine(container: Graphics, source: Vector2, target:Vector2, c, a) {
    container.clear();
    container.lineStyle(1, c, a);
    container.moveTo(source.x, source.y);
    container.lineTo(target.x, target.y);
  }

}
