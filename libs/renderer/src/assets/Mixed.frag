varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec2 dimensions;

${perlin}


void main(void) {
    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;

    gl_FragColor = texture2D(uSampler, vTextureCoord);

        




}
