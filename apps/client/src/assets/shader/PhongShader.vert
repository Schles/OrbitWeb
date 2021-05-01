precision mediump float;

varying vec2 vTextureCoord;

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aNormal;

uniform vec2 u_center;

uniform vec2 u_lightPosition;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying vec3 o_normal;
varying vec3 o_toLight;
varying vec3 o_toCamera;

uniform mat3 u_viewMat;
uniform mat3 u_modelMat;



void main() {

    vec4 wp = vec4( (  translationMatrix * aVertexPosition).xyz, 1.0);
    vec3 worldPosition = vec3( wp.x , wp.y, wp.z);
    worldPosition = vec3( wp.x , wp.y, wp.z);

    vec4 centerPos = vec4( (projectionMatrix * vec3(u_center.x, u_center.y, 0.0)).xyz, 1.0);

    vec2 center = vec2(0.0);

    // normal in world space
    //o_normal = normalize(u_normalMat * i_normal)
    o_normal = vec3(0.0, 0.0, 1.0);



    // direction to light
    //o_toLight = normalize(u_lightPosition - worldPosition.xyz);
    o_toLight = normalize(vec3(u_lightPosition, 100.0) - worldPosition.xyz);

    vec3 u_cameraPosition = vec3(0.0, 0.0, 1.0);
    // direction to camera
    o_toCamera = normalize(u_cameraPosition - worldPosition.xyz);
/*
       // texture coordinates to fragment shader
       o_texcoords = i_texcoord0;


*/

      // screen space coordinates of the vertex
      //gl_Position = u_viewMat * worldPosition;
      vec4 pos = vec4( (projectionMatrix * translationMatrix * worldPosition.xyz).xy, 0.0, 1.0);
      vec4 p1 = vec4(pos.x, pos.y, pos.z, pos.w);

      gl_Position = vec4((projectionMatrix * vec3(aVertexPosition.xy, 1.0)).xy, 0.0, 1.0);
  vTextureCoord = aTextureCoord;
      //gl_Position = p1;
      //gl_Position = vec4(aVertexPosition.xyz, 0.0);
//       gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0) ).xy, 0.0, 1.0);

}

