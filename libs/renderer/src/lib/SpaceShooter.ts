import {CMath} from "@orbitweb/common";

import {Emitter} from "./Emitter";
import {Camera} from "./renderer/Camera";
import {TestFilter} from "./renderer/shader/filter/TestFilter";
import {SunGameObject} from "./model/Sun";
import {Vector2} from "@orbitweb/common";
import {EventEmitter} from "@angular/core";
import {BoundryGO} from "./model/BoundryGO"; 
import {AssetLoader} from "./util/AssetLoader";
import * as PIXI from "pixi.js"
//import vertex from '../shader/myVertex.vs';

export class SpaceShooter extends PIXI.Application {

  public OnResizeWindow: EventEmitter<Vector2> = new EventEmitter<Vector2>();


  public emitter: Emitter;

  public targeting;
  public targetingLine;
  public targetingLine2: PIXI.Graphics;
  public targetingText;

  public boundry: BoundryGO;

  public targetingCircle: PIXI.Graphics;

  private _gameStage: PIXI.Container;
  private _uiStage: PIXI.Container;


  public sunGameObject: SunGameObject;

  private _structureStage: PIXI.Container;
  private _playerStage: PIXI.Container;


  public assetLoader: AssetLoader;

  public depCamera: Camera;


  public get gameStage(): PIXI.Container {
    return this._gameStage;
  }

  public get playerStage(): PIXI.Container {
    return this._playerStage;
  }

  public get uiStage(): PIXI.Container {
    return this._uiStage;
  }


  public get structureStage(): PIXI.Container {
    return this._structureStage;
  }


  public camera: Camera;

  constructor(options) {
    super(options);

    this.boot();
  }



  private renderSizePoint: PIXI.Graphics;


  public setRenderSize(x, y) {

    //this.renderSizePoint.x = x;
    //this.renderSizePoint.y = y;
  }

  public boot() {
    console.log("boot");

    this._gameStage = new PIXI.Container();
    this._uiStage = new PIXI.Container();
    this._structureStage = new PIXI.Container();
    this._playerStage = new PIXI.Container();

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

    this.targeting = new PIXI.Container();
    this.targetingLine = new PIXI.Graphics();
    this.targetingLine2 = new PIXI.Graphics();
    this.targetingCircle = new PIXI.Graphics();


    this.targeting.addChild(this.targetingLine);
    this.targeting.addChild(this.targetingLine2);
    this.targeting.addChild(this.targetingCircle);


    this.targetingText = new PIXI.Text("", {fontFamily : 'Arial', fontSize: 10, fill : 0xff1010, align : 'center'});

    this.targeting.addChild(this.targetingText);





    this.sunGameObject = new SunGameObject(this.gameStage);



  }
  

  public loadShader() {
    //const container = new PIXI.Container();

  }

  public filter: TestFilter

  public onLoaded(loader, res) {
//    console.log(res);

    const testFilter = new TestFilter(null, res.shader.data);

    // first is the horizontal shift, positive is to the right
    // second is the same as scaleY
    //filter.uniforms.shadowDirection = [0.4, 0.5];
    //filter.uniforms.floorY = 0.0;
    // how big is max shadow shift to the side?
    // try to switch that off ;)
    //filter.padding = 100;

    this.sunGameObject.initShader(res.sun.data, this.renderer.screen);

    testFilter.setSize(this.renderer.width, this.renderer.height);




//console.error(this.gameStage.worldTransform);
    //testFilter.setLocalToWorld(this.gameStage.worldTransform);
/*
    this.filter = testFilter;
    this.stage.filterArea = this.renderer.screen;
    //this.gameStage.filters = [new AdvancedBloomFilter()];
    this.filter2 = new BloomFilter();
    // this.filter,
    this.filter3 = new ShadowFilter(this.stage.worldTransform, this.players);
    this.stage.filters = [this.filter];
*/


  }
  private filter3;
  private filter2;

  // Player

 



  

  public drawCross(container: PIXI.Graphics, pos: Vector2) {
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

  public drawLine(container: PIXI.Graphics, source: Vector2, target:Vector2, c, a) {
    container.clear();
    container.lineStyle(1, c, a);
    container.moveTo(source.x, source.y);
    container.lineTo(target.x, target.y);
  }

}
