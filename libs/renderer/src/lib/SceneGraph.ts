import {Vector2} from "@orbitweb/common";
import {EventEmitter} from "@angular/core";
import { Application } from "@pixi/app";
import { Container } from "pixi.js";


export abstract class SceneGraph extends Application {

  public OnResizeWindow: EventEmitter<Vector2> = new EventEmitter<Vector2>();
 

  protected backgroundStage: Container;  
  protected foregroundStage: Container;
  protected gameStage: Container;
  
  public playerStage: Container;
  public uiStage: Container;
  public structureStage: Container;
  public fxStage: Container;

  constructor(options) {
    super(options);

    this.initScene();
  }

  public initScene() {
    this.backgroundStage = new Container();

    this.gameStage = new Container();
    this.uiStage = new Container();
    this.structureStage = new Container();
    this.playerStage = new Container();
    this.foregroundStage = new Container();
    this.fxStage = new Container();

    this.stage.addChild(this.backgroundStage);
    this.stage.addChild(this.foregroundStage);  

    this.foregroundStage.addChild(this.gameStage);
    this.foregroundStage.addChild(this.uiStage);

    this.gameStage.addChild(this.structureStage);
    this.gameStage.addChild(this.fxStage);
    this.gameStage.addChild(this.playerStage);

  }


}
