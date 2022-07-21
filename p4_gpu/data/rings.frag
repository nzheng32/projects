// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() {
    vec4 diffuse_color = vec4 (0.0, 1.0, 1.0, 1.0);
    float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
    gl_FragColor = vec4(0, 1, 1, 1);
    if ((vertTexCoord.s - 0.5)*(vertTexCoord.s - 0.5) + (vertTexCoord.t - 0.5) *(vertTexCoord.t - 0.5) > 0.25){
        gl_FragColor = vec4(diffuse * diffuse_color.rgb, 0.0);
    }

    for(int i=0; i<8; i++){
        float angle = radians(i*45);
        float x = 0.35 * cos(angle);
        float y = 0.35 * sin(angle);
        float centerx = 0.5 + x;
        float centery = 0.5 + y;
        float d1 = (centerx-vertTexCoord.s)*(centerx-vertTexCoord.s);
        float d2 = (centery-vertTexCoord.t)*(centery-vertTexCoord.t);
        if (sqrt(d1 + d2) < 0.1) {
            gl_FragColor = vec4(diffuse * diffuse_color.rgb, 0.0);
        }

    }
    if (abs(vertTexCoord.s - 0.5) < 0.12 && abs(vertTexCoord.t - 0.5) < 0.12){
        gl_FragColor = vec4(diffuse * diffuse_color.rgb, 0.0);
    }

}

