varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec2 dimensions;

uniform vec2 light;
uniform bool parallel;
uniform float aspect;

uniform float gain;
uniform float lacunarity;
uniform float time;
uniform float alpha;

uniform vec2 sunPosition;
uniform vec2 playerPosition;

uniform sampler2D shadowTexture;

${perlin}


void main(void) {
    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;

    float d;

    
        float dx = coord.x - light.x / dimensions.x;
        float dy = (coord.y - light.y / dimensions.y) * aspect;
        float dis = sqrt(dx * dx + dy * dy) + 0.00001;
        d = dy / dis;
    

    vec3 dir = vec3(d, d, 0.0);

    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);
    noise = mix(noise, 0.0, 0.3);
    //fade vertically.
    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);
    mist.a = 0.0;
    // apply user alpha
   // mist *= alpha;

    //if ( coord.x < 0.5 && coord.y < 0.5 ) {
          //gl_FragColor = texture2D(shadowTexture, vTextureCoord);
    
    if ( texture2D(shadowTexture, vTextureCoord).r < 0.1 ) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
        //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    } else {
        gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;
        //gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
        //gl_FragColor = texture2D(uSampler, vTextureCoord) + vec4(1.0, 1.0, 1.0, 1.0);
    }
    
        




}
