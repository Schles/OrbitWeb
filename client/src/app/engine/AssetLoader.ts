import {EventEmitter} from "@angular/core";
import {Message} from "../../../../shared/src/message/Message";

export class AssetLoader {

  public onLoaded: EventEmitter<{ loader: any, res: any }> = new EventEmitter<{ loader: any, res: any }>();

  public load(loader) {

    loader
      .add("shader", "assets/shader/myVertex.fs")
      .add("sun", "assets/shader/SunShader.frag")
      .load( (loader, res) => this.onLoaded.emit( { loader: loader, res: res }) );
  }


}
