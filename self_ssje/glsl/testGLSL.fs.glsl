#ifdef GL_ES
precision highp float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
varying vec3 vUv;

float circle(vec2 uv,vec2 center,float d){
  return length(uv-center)-d;
}

void main(){
  // 计算当前片元的位置（范围从 -1 到 1）
  vec2 uv=gl_FragCoord.xy/u_resolution*2.-1.;
  
  // float offest=.1;//偏移量
  // float scale = .5 ; //缩放比例
  // vec2 a0=vec2(abs(uv.x),abs(uv.y))*(1./scale);
  // vec2 a1=step(vec2(0.+offest,0.+offest),a0.xy)*(vec2(1.,1.)-a0.xy-offest)*2.;
  // float r=abs(sin(u_time*1.5))*.5;
  // gl_FragColor=vec4(r,0.,0.,min(a1.x,a1.y)*r);
  
  //水流效果的着色器
  
  float d=circle(uv,vec2(0.,0.),0.);
  float color1=step(.1,d)*d;// 第一层级颜色
  float color2=step(.4,d)*d;// 第二层级颜色
  float color3=step(.7,d)*d;// 第三层级颜色
  float z=min(min(color1,color2),color3);// 取最小值
  gl_FragColor=vec4(color1,color2,color3,1.-z);
}
