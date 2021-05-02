import {CMath} from "@orbitweb/common";
import {Vector2} from "@orbitweb/common";

import {AssetLoader} from "./util/AssetLoader";
import { Container, Graphics, Text } from "pixi.js";
import { SceneGraph } from "./SceneGraph";





export abstract class World extends SceneGraph{

  constructor(options) {
    super(options);
  }

  public initWorld() {
    super.initWorld();
    console.log("initWorld");

    this.emitter.init();


    this.structureStage.addChild(this.emitter.getContainer());
  }


}
