varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec2 dimensions;


uniform sampler2D shadowTexture;

${perlin}



void main(void) {
    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;


     if ( texture2D(shadowTexture, vTextureCoord).r < 0.1 ) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
     } else {
         gl_FragColor = vec4(0.12, 0.1, 0, 1);
     }

    

        




}
