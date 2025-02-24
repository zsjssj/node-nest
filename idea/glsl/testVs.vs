#version 330 core
layout (location = 0) in vec3 aPos;
varying vec3 vUv;
varying vec3 fragUv;
 
void main() {
	
	gl_PointSize = float(2.);
  vec3 vUv = gl_Position.xyz;
  fragUv=gl_Position.xyz;
}