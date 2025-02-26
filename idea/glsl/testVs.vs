// #version 330 core
// layout (location = 0) in vec3 aPos;
precision mediump float;
varying vec3 fragUv;
uniform vec2 u_resolution;

void main() {
  gl_Position = vec4(1., 1., 1., 1.);
	gl_PointSize = float(2.);
  fragUv=gl_Position.xyz;
}