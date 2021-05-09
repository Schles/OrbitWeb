varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec2 dimensions;
uniform vec2 light;
uniform vec4 inputSize;
uniform vec4 outputFrame;

uniform float minSize;
uniform float maxSize;

uniform sampler2D shadowTexture;

${perlin} 

void main(void) {
    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;

    if(texture2D(shadowTexture, vTextureCoord).r < 0.1) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    } else {

        float dx = light.x / dimensions.x - coord.x;
        float dy = light.y / dimensions.y - coord.y;

        vec2 position = vTextureCoord * inputSize.xy + outputFrame.xy;
        float a = length(light - position);

        if(a < minSize || a > maxSize) {
            gl_FragColor = vec4(0.12, 0.05, 0, 1);
        } else {
            gl_FragColor = vec4(0.12, 0.1, 0, 1);
        }

    }

}
