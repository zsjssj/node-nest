//3.紫色光线
#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
vec3 lazer(vec2 pos, vec3 clr, float mult)
{
	float x = u_time/10. * 2.0;
	float w = fract(x*0.5);
	w = sin(3.14156*w);
	w *= 1.5+pos.x;
	w *= 2.0;
  vec3 color = clr * mult * w / abs(pos.y);
	float d = distance(pos,vec2(-1.0+fract(x*0.5)*2.,0.0));
	color += (clr * 0.25*w/d);
	return color;
}

void main()
{
	vec2 pos = ( gl_FragCoord.xy / u_resolution.xy * 2.0 ) - 1.0;
	vec3 color = max(vec3(0.), lazer(pos, vec3(1.7, 0.2, 3.), 0.25));
	gl_FragColor = vec4(color * 0.05, 1.0);
}