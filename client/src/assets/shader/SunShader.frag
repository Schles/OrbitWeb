precision mediump float;

varying vec2 vTextureCoord;

uniform vec2 sunPosition;


uniform mat3 toWorld;

uniform sampler2D uSampler;

uniform float deltaTime;
uniform float animationTime;

uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;

uniform float sunSize;


uniform vec4 filterArea;

uniform float schles;

void main(void)
{
	  //vec2 st = / viewPort;

    vec2 pp = vTextureCoord;


    float disstt = distance(gl_FragCoord.xy, sunPosition);

    if ( disstt < sunSize ) {
        vec4 one = texture2D(uTextureOne, vTextureCoord);
        vec4 two = texture2D(uTextureTwo, vTextureCoord);
        float v = 0.5 * sin(deltaTime) + 0.5;
        float c = 0.5 * cos(deltaTime) + 0.5;
        gl_FragColor = one * c + two * v;
    } else {
       gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
}

