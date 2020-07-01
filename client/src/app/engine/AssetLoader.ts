import {EventEmitter} from "@angular/core";

export class AssetLoader {

  public static data;

  public static onLoaded: EventEmitter<{ loader: any, res: any }> = new EventEmitter<{ loader: any, res: any }>();

  public load(loader) {

    loader
      .add("shader", "assets/shader/myVertex.fs")
      .add("sun", "assets/shader/SunShader.frag")
      .add("phongFrag", "assets/shader/PhongShader.frag")
      .add("phongVert", "assets/shader/PhongShader.vert")
      .load( (loader, res) => {
        AssetLoader.data = res;
        AssetLoader.onLoaded.emit( { loader: loader, res: res })
       });
  }


}
