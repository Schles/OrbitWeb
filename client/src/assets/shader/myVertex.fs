precision mediump float;

varying vec2 vTextureCoord;

uniform vec2 sunPosition;
uniform vec2 playerPosition;
uniform vec2 viewPort;

uniform mat3 toWorld;

uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec2 red;
uniform vec2 green;
uniform vec2 blue;

uniform float schles;

bool sameSide(vec2 p1, vec2 p2, vec2 a, vec2 b) {
  vec3 cp1 = cross(vec3(b.x, b.y, 1.0) - vec3(a.x, a.y, 0.0), vec3(p1.x, p1.y, 1.0) - vec3(a.x, a.y, 0.0));
  vec3 cp2 = cross(vec3(b.x, b.y, 1.0) - vec3(a.x, a.y, 0.0), vec3(p2.x, p2.y, 1.0) - vec3(a.x, a.y, 0.0));

  if ( dot(cp1, cp2) >= 0.0 )
    return true;

  return false;


}

bool pointInTriangle(vec2 p, vec2 a, vec2 b, vec2 c) {
  if ( sameSide(p, a, b, c) )
    return true;
  return false;
}



bool CheckLineSegmentCircleIntersection(float x1, float y1, float x2, float y2, float xc, float yc, float r) {
    float xd = 0.0;
    float yd = 0.0;
    float t = 0.0;
    float d = 0.0;
    float dx_2_1 = 0.0;
    float dy_2_1 = 0.0;

    dx_2_1 = x2 - x1;
    dy_2_1 = y2 - y1;

    t = ((yc - y1) * dy_2_1 + (xc - x1) * dx_2_1) / (dy_2_1 * dy_2_1 + dx_2_1 * dx_2_1);

    if ( 0.0 <= t && t <= 1.0 ) {
        xd = x1 + t * dx_2_1;
        yd = y1 + t * dy_2_1;

        d = sqrt((xd - xc) * (xd - xc) + (yd - yc) * (yd - yc));
        return d <= r;
    } else {
        d = sqrt((xc - x1) * (xc - x1) + (yc - y1) * (yc - y1));
        if (d <= r) {
            return true;
        } else {
            d = sqrt((xc - x2) * (xc - x2) + (yc - y2) * (yc - y2));
            if(d <= r) {
                return true;
            } else {
                return false;
            }
        }
    }
}

bool intersectTwoLines(vec2 p, vec2 r, vec2 q, vec2 s) {


  float dis = distance(p, q);

  if ( dis < 400.0)
    return true;
  return false;
}

void main(void)
{
	  vec2 st = gl_FragCoord.xy / viewPort;
    float pct = 0.0;

   vec2 a = vec2(0.0, 0.0);
   //vec2 b = vec2(0.0, 100.0);
   //vec2 c = vec2(100.0, 0.0);

   vec2 b = playerPosition;
    vec2 c = sunPosition;





   vec2 p;
   p.x = st.x * viewPort.x;
   p.y = (1.0 - st.y) * viewPort.y;


   //vec2 rayToSun = p - sunPosition;

   //vec2 rayFromShip = cross ( vec3(rayToSun.x, rayToSun.y, 0.0), vec3( 0.0, 0.0, 1.0)).xy;




    bool found = CheckLineSegmentCircleIntersection(p.x, p.y, sunPosition.x, sunPosition.y, playerPosition.x, playerPosition.y, 10.0);


    if (found){
      vec4 lightColor = vec4( 1.0, 1.0, 1.0, 0.1 );
      vec4 color = texture2D(uSampler, vTextureCoord);

      float value = 0.95;

      gl_FragColor.x = value * color.x + (1.0 - value) * lightColor.x;
      gl_FragColor.y = value * color.y + (1.0 - value) * lightColor.y;
      gl_FragColor.z = value * color.z + (1.0 - value) * lightColor.z;
      gl_FragColor.w = value * color.w + (1.0 - value) * lightColor.w;

    } else {
    //varying vec2 vTextureCoord;
    //gl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    }

}

