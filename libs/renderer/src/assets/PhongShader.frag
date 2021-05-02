precision mediump float;

varying vec3 normalInterp;
varying vec3 vertPos;

varying vec2 vTextureCoord;

uniform vec2 lightPos;

uniform vec2 u_lightPosition;
uniform vec3 u_cameraPosition;
uniform vec3 lightColor;
uniform float lightPower;

uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specColor;

uniform float shininess;

varying vec3 o_normal;
varying vec3 o_toLight;
varying vec3 o_toCamera;

uniform sampler2D uSampler;

uniform vec2 viewPort;
/*
uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;
*/

// returns intensity of reflected ambient lighting
vec3 ambientLighting()
{
   //return u_matAmbientReflectance * u_lightAmbientIntensity;
   return ambientColor;
}

// returns intensity of diffuse reflection
float diffuseLighting(in vec3 N, in vec3 L)
{
   // calculation as for Lambertian reflection
   float diffuseTerm = dot(N, L);

return diffuseTerm;

   if ( diffuseTerm < 0.0 )
       return 0.0;
      else if ( diffuseTerm > 1.0 )
       return 1.0;
      else
    return diffuseTerm;


   // TODO: clamp between 0 und 1

   //return u_matDiffuseReflectance * u_lightDiffuseIntensity * diffuseTerm;

   //return diffuseColor;
}

// returns intensity of specular reflection
float specularLighting(in vec3 N, in vec3 L, in vec3 V)
{
   float specularTerm = 0.0;

   // calculate specular reflection only if
   // the surface is oriented to the light source
   if(dot(N, L) > 0.0)
   {
      // half vector
      vec3 H = normalize(L + V);
      specularTerm = pow(dot(N, H), shininess);
   }
   //return u_matSpecularReflectance * u_lightSpecularIntensity * specularTerm;


   return specularTerm;
}


void main(void)
{


  vec2 worldP = gl_FragCoord.xy / viewPort;


  vec3 worldPosition = vec3(vTextureCoord.xy, 0.0);

    vec3 o_toLight = normalize(vec3(u_lightPosition, 10.0) - worldPosition);

  // direction to camera
  vec3 o_toCamera = normalize(u_cameraPosition - worldPosition);


   vec3 L = normalize(o_toLight);
   vec3 V = normalize(o_toCamera);
   vec3 N = normalize(vec3(0.0, 0.0, 1.0));

   // get Blinn-Phong reflectance components

   //float Iamb = ambientLighting();
   //float Idif = diffuseLighting(N, L);

    //vec3 diffuseColor = texture(u_diffuseTexture, o_texcoords).rgb;
    //vec3 diffuseColor = vec3(1.0, 0.0, 1.0);

    float diffuse = diffuseLighting(N, L);
    float specular = specularLighting(N, L, V);


      //vec4 color1 = texture2D(uSampler, vTextureCoord);
      vec4 color1 = vec4(1.0, 0.0, 0.0, 1.0);

    vec3 color = color1.xyz +
                 ambientColor +
                 diffuseColor * diffuse +
                 specColor * specular;

    gl_FragColor = vec4(color, 1.0);

  //gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
}

