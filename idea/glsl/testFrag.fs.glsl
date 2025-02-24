
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
varying vec3 vUv;
varying vec3 fragUv;

void main() {
      // vec2 p = gl_FragCoord.xy/u_resolution;
      //gl_PointCoord

      // gl_FragColor = vec4(gl_FragCoord.xyz, 1.0);
       
      // float strength = mod(vUv.y * 10.0 , 1.0);
      // gl_FragColor = vec4(strength,strength,strength,1);
      // gl_FragColor = vec4(0.0, 0.5176, 1.0, 1.0); // Set the color 
  
      // 计算当前片元的位置（范围从 -1 到 1）
      vec2 uv = gl_FragCoord.xy / u_resolution * 2.0 - 1.0; 
      uv.x *= u_resolution.x / u_resolution.y; // 保持纵横比
      // 定义圆和圆环的参数
      float innerRadius = 0.1; 
      float outerRadius = 0.2; 
      float louterRadius = 0.3; 
      // 计算距离
      float distance = length(uv);
      // 着色逻辑
      if (distance < innerRadius) {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0); // 内圆的颜色
      } else if (distance < outerRadius) {
        gl_FragColor = vec4(gl_FragCoord.xy,.0,.0); // 中间圆环的颜色
      } else if (distance < louterRadius) {
        gl_FragColor = vec4(1.,.0,.0,1.); // 外圆环的颜色
      }
      else if (distance < 0.4) {
        gl_FragColor = vec4(gl_FragCoord.xy,.0,.0); // 中间圆环的颜色
      } else {
        gl_FragColor = vec4(1.,1.,1.,.5); // 背景颜色
      }
}
