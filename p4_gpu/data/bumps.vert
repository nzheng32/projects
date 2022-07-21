// Vertex shader
// The vertex shader is run once for every vertex
// It can change the (x,y,z) of the vertex, as well as its normal for lighting.

// Our shader uses both processing's texture and light variables
#define PROCESSING_TEXLIGHT_SHADER

// Set automatically by Processing
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
uniform mat4 texMatrix;
uniform sampler2D texture;

// Come from the geometry/material of the object
attribute vec4 vertex;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

// These values will be sent to the fragment shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;
varying vec4 vertTexCoordR;
varying vec4 vertTexCoordL;


void main() {

  // provided
  vertColor = color;
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);

  // calculate distance / vertex information
  float strength = 20;
  float frequency = 30;

  float distance_curr = sqrt((vertTexCoord.s - 0.5) * (vertTexCoord.s - 0.5) +(vertTexCoord.t - 0.5) * (vertTexCoord.t - 0.5));
  float curr_offset = strength * sin(frequency * distance_curr);

  float distance_left = sqrt((vertTexCoord.s + 0.04 - 0.5) * (vertTexCoord.s + 0.04 - 0.5) +(vertTexCoord.t - 0.5) * (vertTexCoord.t - 0.5));
  float distance_right = sqrt((vertTexCoord.s -0.04 - 0.5) * (vertTexCoord.s -0.04 - 0.5) +(vertTexCoord.t - 0.5) * (vertTexCoord.t - 0.5));
  float distance_up =  sqrt((vertTexCoord.s - 0.5) * (vertTexCoord.s - 0.5) +(vertTexCoord.t + 0.04 - 0.5) * (vertTexCoord.t + 0.04 - 0.5));
  float distance_down = sqrt((vertTexCoord.s - 0.5) * (vertTexCoord.s - 0.5) +(vertTexCoord.t - 0.04 - 0.5) * (vertTexCoord.t  - 0.04 - 0.5));

  float left_offset = strength * sin(frequency * distance_left);
  float right_offset = strength * sin(frequency * distance_right);
  float down_offset = strength * sin(frequency * distance_down);
  float up_offset =  strength * sin(frequency * distance_up);
  float x_offset_diff = left_offset - right_offset;
  float y_offset_diff = up_offset - down_offset;

  vec3 new_normal = vec3(normal.x - x_offset_diff*0.05, normal.y - y_offset_diff*0.05, normal.z);

  vec4 normal_add = vec4(curr_offset * normal.x, curr_offset * normal.y, curr_offset * normal.z, 0.0);
  vertNormal = normalize(normalMatrix * new_normal);

  gl_Position = transform * (vertex + normal_add);
  vertLightDir = normalize(-lightNormal);

}
