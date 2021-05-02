import {EventEmitter} from "@angular/core";

export class AssetLoader {

  public static data;

  public static onLoaded: EventEmitter<{ loader: any, res: any }> = new EventEmitter<{ loader: any, res: any }>();

  public load(loader) {

    loader
      .add("defaultVert", "assets/shader/Default.vert")
      .add("shader", "assets/shader/myVertex.fs")
      .add("sun", "assets/shader/SunShader.frag")
      .add("phongFrag", "assets/shader/PhongShader.frag")
      .add("phongVert", "assets/shader/PhongShader.vert")
      .add('godFrag', "assets/shader/GodRayShader.frag")
      .add('godVert', "assets/shader/GodRayShader.vert")
      .add('perlin', "assets/shader/Perlin.frag")
      .load( (loader, res) => {
        AssetLoader.data = res;
        AssetLoader.onLoaded.emit( { loader: loader, res: res })
       });
  }


}
