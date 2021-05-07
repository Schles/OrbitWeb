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

${perlin}


bool sample(void) {
    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;
    float dx = light.x / dimensions.x - coord.x;
    float dy = light.y / dimensions.y - coord.y;


    for ( int i = 0; i < 100; ++i){

        float a;
        a = float(i) * 0.01;

        vec2 c;
        c.x = vTextureCoord.x + dx * a;
        c.y = vTextureCoord.y + dy * a ;

        vec4 texture = texture2D(uSampler, c);

    //if ( texture.r > 0.5) {
        if ( texture.r > 0.0 || texture.g > 0.0 || texture.b > 0.0) {
        return true;
        }
    }

    

    return false;


}

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
    vec4 texture = texture2D(uSampler, vTextureCoord);

    //if ( coord.x < 0.5 && coord.y < 0.5 ) {
    if ( sample() ) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    } else {
        gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;
        //gl_FragColor = texture2D(uSampler, vTextureCoord) + vec4(1.0, 1.0, 1.0, 1.0);
    }




}
