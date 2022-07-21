// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;
uniform sampler2D other_texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

//other_texture = dog texture
// my_texture = ship_texture
void main() {
    vec4 diffuse_color;
    int count = 1;
    float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
    float someOffset = 1.0/100.0;
    for (int i = 0; i < 3; i++){
        for(int j = 0; j< 3;j++) {
            int increment_x = i - 1;
            int increment_y = j - 1;
            if (vertTexCoord.s + someOffset * increment_x <=1 && vertTexCoord.t + someOffset * increment_y <= 1) {
                vec4 new_color = texture2D(my_texture, vec2(vertTexCoord.s + someOffset * increment_x, vertTexCoord.t + someOffset * increment_y));
                diffuse_color = diffuse_color + new_color;
                count = count + 1;
            }
        }
    }
    diffuse_color = diffuse_color / count;

    vec4 dog_color = texture2D(other_texture, vec2( 3* (vertTexCoord.x - 0.5), 3* (vertTexCoord.y - 0.5)));
    if ((dog_color.g <= 0.8 || dog_color.r > 0.8 || dog_color.b > 0.8) && vertTexCoord.y < 0.83 ) {
        gl_FragColor = vec4(diffuse * dog_color.rgb, 1.0);
    } else{
        gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
    }
}
