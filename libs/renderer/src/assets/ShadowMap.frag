varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec2 dimensions;

uniform vec2 light;
uniform float aspect;

uniform int sampleSize;

const int maxIter = 100;

bool isOccluded(void) {
    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;
    float dx = light.x / dimensions.x - coord.x;
    float dy = light.y / dimensions.y - coord.y;

    for(int i = 0; i < maxIter; ++i) {

        float a = float(i) / float(sampleSize);

        vec2 c;
        c.x = vTextureCoord.x + dx * a;
        c.y = vTextureCoord.y + dy * a;

        vec4 texture = texture2D(uSampler, c);

        if(texture.r > 0.0 || texture.g > 0.0 || texture.b > 0.0) {
            return true;
        }
    }

    return false;
}

void main(void) {


    if(!isOccluded()) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }

}
