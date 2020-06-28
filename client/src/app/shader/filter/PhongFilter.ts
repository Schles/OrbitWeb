import {Vector2} from "../../../../../shared/src/util/VectorInterface";
import {PIXIUtilts} from "../../util/PIXIUtilts";
import {CMath} from "../../util/CMath";

export class PhongFilter extends PIXI.Filter{
  constructor(a, b) {
    super(a, b);

    this.uniforms.u_lightPosition = [+10, 0.5];
    this.uniforms.u_cameraPosition = [0, 0, 10];
    this.uniforms.lightColor = [0.0, 0.0, 0.0];
    this.uniforms.lightPower = 40.0;

    this.uniforms.u_center = [0.0, 0.0];

    this.uniforms.ambientColor = [0.0, 0.0, 0.0];

    this.uniforms.diffuseColor = [0.0, 0.0 , 1.0];

    this.uniforms.specColor = [0.0, 1.0, 0.0];

    this.uniforms.shininess = 16.0;

    this.uniforms.u_viewMat = [1,0,0, 0,1,0, 0,0,1];
    this.uniforms.u_modelMat = [1,0,0, 0,1,0, 0,0,1];
  }

  public setLocalToWorld(mat) {
    this.uniforms.localToWorld = mat;
  }

  public setSize(x, y) {
    this.uniforms.viewPort = [x, y];
  }

  public iterate(playerPosition: Vector2, sunPosition?: Vector2, cameraPosition?: Vector2) {
    this.uniforms.u_center = [playerPosition.x, playerPosition.y];
    let localSunPosition: Vector2 = CMath.sub(sunPosition, playerPosition);
    let localCameraPosition: Vector2 = CMath.sub(cameraPosition, playerPosition);

    localSunPosition = CMath.scale(CMath.normalize(localSunPosition), CMath.len(localSunPosition) / 100);

    localCameraPosition = CMath.scale(CMath.normalize(localCameraPosition), CMath.len(localCameraPosition) / 100);


    this.uniforms.u_cameraPosition = [localCameraPosition.x, localCameraPosition.y, 10];
    this.uniforms.u_lightPosition = [localSunPosition.x, localSunPosition.y];

    //const a = PIXIUtilts.toGLSL(this.gameObject.parent.parent.worldTransform);

    //this.filter.uniforms.u_viewMatrix = a;
/*
    const a = this.gameObject.parent.parent.toGlobal(<any> {x: 0, y:0 });
    const b = this.gameObject.toLocal(a);
    this.filter.uniforms.u_lightPosition = [b.x, b.y];
*/
//      console.log(b);
    /*
    const c = gameObject.parent.parent.worldTransform;
    const d = this.playerLayer.worldTransform;


    this.uniforms.u_viewMat = PIXIUtilts.toGLSL1(c);
    this.uniforms.u_modelMat = PIXIUtilts.toGLSL1(d);
*/
    //const buffer = this.mesh.geometry.getBuffer("aVertexPosition");

//      console.log(buffer.data.length);


    //this.uniforms.u_modelMat = PIXIUtilts.toGLSL1(this.model);
    //this.uniforms.u_viewMat = PIXIUtilts.toGLSL1(this.view);



    let pos = {x: 0, y: 0}

    //const modelView = this.view.clone().append(this.model.clone());



    //let e = modelView.apply(this.position);

//pos = this.gameObject.parent.parent.toLocal(this.position);

    //console.log("a", this.gameObject.localTransform.apply(pos));
//    console.log(e);


//      console.log(data);
    //buffer.update(data);




    //console.log(this.id, d.ty);

  }
}
