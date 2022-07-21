// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() {
  vec4 diffuse_color = vec4 (1.0, 0.0, 0.0, 1.0);
  vec4 diffuse_color_mandel = vec4 (1.0, 1.0, 1.0, 1.0);
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);


  float real = ((float(vertTexCoord.x)*3.0)-1.5);
  float img =  ((float(vertTexCoord.y)*3.0)-1.5);
  for(int i=0;i<20;i++){
    float tempReal = (float(real*real*real))-(3.0 * float(img*img) * float(real));
    float tempImg = 3.0 * float(real*real) *float(img) - float(img*img*img);
    real = tempReal+cx;
    img = tempImg+cy;
    float distance = sqrt(((real - 0.5)*(real- 0.5))+((img- 0.5)*(img- 0.5)));
    if(distance < 4){
      gl_FragColor = vec4(diffuse * diffuse_color_mandel.rgb, 1.0);
    } else {
      gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
    }
  }

}
