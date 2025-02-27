//1.圆环
// #ifdef GL_ES
// precision mediump float;
// #endif
// uniform vec2 u_resolution;
// varying vec3 vUv;
// void main() {
//       // 计算当前片元的位置（范围从 -1 到 1）
//       vec2 uv = gl_FragCoord.xy / u_resolution * 2.0 - 1.0; 
//       uv.x *= u_resolution.x / u_resolution.y; // 保持纵横比
//       // 定义圆和圆环的参数
//       float innerRadius = 0.1; 
//       float outerRadius = 0.2; 
//       float louterRadius = 0.3; 
//       float distance = length(uv);// 计算距离
//       if (distance < innerRadius) { // 着色逻辑
//         gl_FragColor = vec4(1.0,0.0,0.0,1.0); // 内圆的颜色
//       } else if (distance < outerRadius) {
//         gl_FragColor = vec4(gl_FragCoord.xy,.0,.0); // 中间圆环的颜色
//       } else if (distance < louterRadius) {
//         gl_FragColor = vec4(1.,.0,.0,1.); // 外圆环的颜色
//       }
//       else if (distance < 0.4) {
//         gl_FragColor = vec4(gl_FragCoord.xy,.0,.0); // 中间圆环的颜色
//       } else {
//         gl_FragColor = vec4(1.,1.,1.,.5); // 背景颜色
//       }
// }

//--------------------------------------------------------------------------
//2.蓝色纹理图
// #ifdef GL_ES
// precision mediump float;
// #endif
// uniform float u_time; // Time uniform to control animation
// uniform vec2 u_resolution; // Screen u_resolution
// // Function to generate Pacific blue palette colors based on a value
// vec3 pacificBluePalette(float value) {
//     // Adjust the RGB components to create a Pacific blue palette
//     return vec3(0.1, 0.3 + 0.07 * sin(value), 1.8 + 0.9 * sin(value * 0.5));
// }
// void main() {
//     vec2 uv = gl_FragCoord.xy / u_resolution.xy; // Normalize coordinates
//     // Introduce random factors to add complexity
//     float randomFactor = fract(sin(dot(uv, vec2(7777777.9898, 9.233))) * 33758.5453);
//     // Calculate flow field direction based on uv coordinates and u_time
//     float scale = 9.0;
//     float angle = sin(uv.x * scale) + cos(uv.y * scale) + u_time;
//     vec2 flowDir = vec2(cos(angle), sin(angle));
//     // Apply flow field and random factors to uv coordinates
//     vec2 newUV = uv + flowDir * randomFactor * 0.04;
//     // Create brutalist-style pixel art pattern
//     vec2 scaledUV = newUV * 20.0; // Scale uv coordinates
//     float pixelValue = 1.0 - step(0.5, mod(scaledUV.x + scaledUV.y, 2.0)); // Inverted pattern
//     // Background color (dark Pacific blue)
//     vec3 backgroundColor = pacificBluePalette(0.0);
//     // Pixel color (light Pacific blue)
//     vec3 pixelColor = pacificBluePalette(u_time + scaledUV.x + scaledUV.y); // Modulate with u_time for animation
//     // Combine colors based on pixelValue
//     vec3 finalColor = mix(backgroundColor, pixelColor, pixelValue);
//     gl_FragColor = vec4(finalColor, 1.0); // Set fragment color
// }


//--------------------------------------------------------------------------
//3.紫色光线
// #ifdef GL_ES
// precision mediump float;
// #endif
// uniform float u_time;
// uniform vec2 u_resolution;
// uniform vec2 u_mouse;
// vec3 lazer(vec2 pos, vec3 clr, float mult)
// {
// 	float x = u_time/10. * 2.0;
// 	float w = fract(x*0.5);
// 	w = sin(3.14156*w);
// 	w *= 1.5+pos.x;
// 	w *= 2.0;
//   vec3 color = clr * mult * w / abs(pos.y);
// 	float d = distance(pos,vec2(-1.0+fract(x*0.5)*2.,0.0));
// 	color += (clr * 0.25*w/d);
// 	return color;
// }

// void main()
// {
// 	vec2 pos = ( gl_FragCoord.xy / u_resolution.xy * 2.0 ) - 1.0;
// 	vec3 color = max(vec3(0.), lazer(pos, vec3(1.7, 0.2, 3.), 0.25));
// 	gl_FragColor = vec4(color * 0.05, 1.0);
// }




//--------------------------------------------------------------------------
//4.大型草地场景
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 mouse;
uniform vec2 u_resolution;
float PI  = 4.0*atan(1.0);

vec3 sunLight  = normalize( vec3(  0.35, 0.2,  0.3 ) );
vec3 cameraPos;
vec3 sunColour = vec3(1.0, .75, .6);
const mat2 rotate2D = mat2(1.932, 1.623, -1.623, 1.95);
float gTime = 0.0;

//--------------------------------------------------------------------------
// Noise functions...
float Hash( float n )
{
  return fract(sin(n)*43758.5453123);
}
float Hash(vec2 p)
{
	return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}
float Noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0;
    float res = mix(mix( Hash(n+  0.0), Hash(n+  1.0),f.x),
                    mix( Hash(n+ 57.0), Hash(n+ 58.0),f.x),f.y);
    return res;
}

vec2 Voronoi( in vec2 x )
{
	vec2 p = floor( x );
	vec2 f = fract( x );
	float res=100.0,id;
	for( int j=-1; j<=1; j++ )
	for( int i=-1; i<=1; i++ )
	{
		vec2 b = vec2( float(i), float(j) );
		vec2 r = vec2( b ) - f  + Hash( p + b );
		float d = dot(r,r);
		if( d < res )
		{
			res = d;
			id  = Hash(p+b);
		}			
    }
	return vec2(max(.4-sqrt(res), 0.0),id);
}


//--------------------------------------------------------------------------
vec2 Terrain( in vec2 p)
{
	float type = 0.0;
	vec2 pos = p*0.003;
	float w = 50.0;
	float f = .0;
	for (int i = 0; i < 3; i++)
	{
		f += Noise(pos) * w;
		w = w * 0.62;
		pos *= 2.5;
	}

	return vec2(f, type);
}

//--------------------------------------------------------------------------
vec2 Map(in vec3 p)
{
	vec2 h = Terrain(p.xz);
    return vec2(p.y - h.x, h.y);
}

//--------------------------------------------------------------------------
float FractalNoise(in vec2 xy)
{
	float w = .7;
	float f = 0.0;

	for (int i = 0; i < 3; i++)
	{
		f += Noise(xy) * w;
		w = w*0.6;
		xy = 2.0 * xy;
	}
	return f;
}

//--------------------------------------------------------------------------
// Grab all sky information for a given ray from camera
vec3 GetSky(in vec3 rd)
{
	float sunAmount = max( dot( rd, sunLight), 0.0 );
	float v = pow(1.0-max(rd.y,0.0),6.);
	vec3  sky = mix(vec3(.1, .2, .3), vec3(.32, .32, .32), v);
	sky = sky + sunColour * sunAmount * sunAmount * .25;
	sky = sky + sunColour * min(pow(sunAmount, 800.0)*1.5, .3);
	return clamp(sky, 0.0, 1.0);
}

//--------------------------------------------------------------------------
// Merge grass into the sky background for correct fog colouring...
vec3 ApplyFog( in vec3  rgb, in float dis, in vec3 dir)
{
	float fogAmount = clamp(dis*dis* 0.0000012, 0.0, 1.0);
	return mix( rgb, GetSky(dir), fogAmount );
}

//--------------------------------------------------------------------------
vec3 DE(vec3 p)
{
	float base = Terrain(p.xz).x - 1.9;
	float height = Noise(p.xz*2.0)*.75 + Noise(p.xz)*.35 + Noise(p.xz*.5)*.2;
	//p.y += height;
	float y = p.y - base-height;
	y = y*y;
	vec2 ret = Voronoi((p.xz*2.5+sin(y*4.0+p.zx*12.3)*.12+vec2(sin(u_time*2.3+1.5*p.z),sin(u_time*3.6+1.5*p.x))*y*.5));
	float f = ret.x * .6 + y * .58;
	return vec3( y - f*1.4, clamp(f * 1.5, 0.0, 1.0), ret.y);
}

//--------------------------------------------------------------------------
// eiffie's code for calculating the aperture size for a given distance...
float CircleOfConfusion(float t)
{
	return max(t * .04, (2.0 / u_resolution.y) * (1.0+t));
}

//--------------------------------------------------------------------------
float Linstep(float a, float b, float t)
{
	return clamp((t-a)/(b-a),0.,1.);
}

//--------------------------------------------------------------------------
vec3 GrassBlades(in vec3 rO, in vec3 rD, in vec3 mat, in float dist)
{
	float d = 0.0;
	float f;
	// Only calculate cCoC once is enough here...
	float rCoC = CircleOfConfusion(dist*.3);
	float alpha = 0.0;
	
	vec4 col = vec4(mat*0.15, 0.0);

	for (int i = 0; i < 15; i++)
	{
		if (col.w > .99) break;
		vec3 p = rO + rD * d;
		
		vec3 ret = DE(p);
		ret.x += .5 * rCoC;

		if (ret.x < rCoC)
		{
			alpha = (1.0 - col.y) * Linstep(-rCoC, rCoC, -ret.x);//calculate the mix like cloud density
			f = clamp(ret.y, 0.0, 1.0);
			// Mix material with white tips for grass...
			vec3 gra = mix(mat, vec3(.35, .35, min(pow(ret.z, 4.0)*35.0, .35)), pow(ret.y, 9.0)*.7) * ret.y;
			col += vec4(gra * alpha, alpha);
		}
		d += max(ret.x * .7, .1);
	}
	if(col.w < .2)
		col.xyz = vec3(0.1, .15, 0.05);
	return col.xyz;
}

//--------------------------------------------------------------------------
// Calculate sun light...
void DoLighting(inout vec3 mat, in vec3 pos, in vec3 normal, in vec3 eyeDir, in float dis)
{
	float h = dot(sunLight,normal);
	mat = mat * sunColour*(max(h, 0.0)+.2);
}

//--------------------------------------------------------------------------
vec3 TerrainColour(vec3 pos, vec3 dir,  vec3 normal, float dis, float type)
{
	vec3 mat;
	if (type == 0.0)
	{
		// Random colour...
		mat = mix(vec3(.0,.3,.0), vec3(.2,.3,.0), Noise(pos.xz*.025));
		// Random shadows...
		float t = FractalNoise(pos.xz * .1)+.5;
		// Do grass blade tracing...
		mat = GrassBlades(pos, dir, mat, dis) * t;
		DoLighting(mat, pos, normal,dir, dis);
	}
	mat = ApplyFog(mat, dis, dir);
	return mat;
}

//--------------------------------------------------------------------------
// Home in on the surface by dividing by two and split...
float BinarySubdivision(in vec3 rO, in vec3 rD, float t, float oldT)
{
	float halfwayT = 0.0;
	for (int n = 0; n < 5; n++)
	{
		halfwayT = (oldT + t ) * .5;
		if (Map(rO + halfwayT*rD).x < .05)
		{
			t = halfwayT;
		}else
		{
			oldT = halfwayT;
		}
	}
	return t;
}

//--------------------------------------------------------------------------
bool Scene(in vec3 rO, in vec3 rD, out float resT, out float type )
{
    float t = 5.;
	float oldT = 0.0;
	float delta = 0.;
	vec2 h = vec2(1.0, 1.0);
	bool hit = false;
	for( int j=0; j < 80; j++ )
	{
	    vec3 p = rO + t*rD;
		if (p.y < 105.0 && !hit)
		{
			h = Map(p); // ...Get this position's height mapping.
	
			// Are we inside, and close enough to fudge a hit?...
			if( h.x < 0.05)
			{
				// Yes! So home in on height map...
				resT = BinarySubdivision(rO, rD, t, oldT);
				type = h.y;
				hit = true;
			}else
			{
				// Delta ray advance - a fudge between the height returned
				// and the distance already travelled.
				// Compromise between speed and accuracy...
				delta = max(0.04, 0.35*h.x) + (t*0.04);
				oldT = t;
				t += delta;
			}
		}
	}

	return hit;
}

//--------------------------------------------------------------------------
vec3 CameraPath( float t )
{
	//t = u_time + t;
    vec2 p = vec2(200.0 * sin(3.54*t), 200.0 * cos(2.0*t) );
	return vec3(p.x+55.0,  12.0+sin(t*.3)*6.5, -94.0+p.y);
} 

//--------------------------------------------------------------------------
vec3 PostEffects(vec3 rgb, vec2 xy)
{
	// Gamma first...
	rgb = pow(rgb, vec3(0.45));
	
	// Then...
	#define CONTRAST 1.1
	#define SATURATION 1.3
	#define BRIGHTNESS 1.3
	rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb*BRIGHTNESS)), rgb*BRIGHTNESS, SATURATION), CONTRAST);
	// Vignette...
	rgb *= .4+0.5*pow(40.0*xy.x*xy.y*(1.0-xy.x)*(1.0-xy.y), 0.2 );	
	return rgb;
}

//--------------------------------------------------------------------------
void main(void)
{
	float m = (mouse.x/u_resolution.x)*300.0;
	float gTime = (u_time*5.0+m+2352.0)*.006;
    vec2 xy = gl_FragCoord.xy / u_resolution.xy;
	vec2 uv = (-1.0 + 2.0 * xy) * vec2(u_resolution.x/u_resolution.y,1.0);
	vec3 camTar;
	
	if (xy.y < .13 || xy.y >= .87)
	{
		// Top and bottom cine-crop - what a waste! :)
		gl_FragColor=vec4(vec4(0.0));
		return;
	}

	#ifdef STEREO
	float isCyan = mod(gl_FragCoord.x + mod(gl_FragCoord.y,2.0),2.0);
	#endif

	cameraPos = CameraPath(gTime + 0.0);
	camTar	 = CameraPath(gTime + .009);
	cameraPos.y += Terrain(CameraPath(gTime + .009).xz).x;
	camTar.y = cameraPos.y;
	
	float roll = .4*sin(gTime+.5);
	vec3 cw = normalize(camTar-cameraPos);
	vec3 cp = vec3(sin(roll), cos(roll),0.0);
	vec3 cu = cross(cw,cp);
	vec3 cv = cross(cu,cw);
	vec3 dir = normalize(uv.x*cu + uv.y*cv + 1.3*cw);
	mat3 camMat = mat3(cu, cv, cw);

	#ifdef STEREO
	cameraPos += .85*cu*isCyan; // move camera to the right - the rd vector is still good
	#endif

	vec3 col;
	float distance;
	float type;
	if( !Scene(cameraPos, dir, distance, type) )
	{
		// Missed scene, now just get the sky...
		col = GetSky(dir);
	}
	else
	{
		// Get world coordinate of landscape...
		vec3 pos = cameraPos + distance * dir;
		// Get normal from sampling the high definition height map
		// Use the distance to sample larger gaps to help stop aliasing...
		vec2 p = vec2(0.1, 0.0);
		vec3 nor  	= vec3(0.0,		Terrain(pos.xz).x, 0.0);
		vec3 v2		= nor-vec3(p.x,	Terrain(pos.xz+p).x, 0.0);
		vec3 v3		= nor-vec3(0.0,	Terrain(pos.xz-p.yx).x, -p.x);
		nor = cross(v2, v3);
		nor = normalize(nor);

		// Get the colour using all available data...
		col = TerrainColour(pos, dir, nor, distance, type);
	}
	
	// bri is the brightness of sun at the centre of the camera direction.
	// Yeah, the lens flares is not exactly subtle, but it was good fun making it.
	float bri = dot(cw, sunLight)*.75;
	if (bri > 0.0)
	{
		vec2 sunPos = vec2( dot( sunLight, cu ), dot( sunLight, cv ) );
		vec2 uvT = uv-sunPos;
		uvT = uvT*(length(uvT));
		bri = pow(bri, 6.0)*.8;

		// glare = the red shifted blob...
		float glare1 = max(dot(normalize(vec3(dir.x, dir.y+.3, dir.z)),sunLight),0.0)*1.4;
		// glare2 is the yellow ring...
		float glare2 = max(1.0-length(uvT+sunPos*.5)*4.0, 0.0);
		uvT = mix (uvT, uv, -2.3);
		// glare3 is a purple splodge...
		float glare3 = max(1.0-length(uvT+sunPos*5.0)*1.2, 0.0);

		col += bri * vec3(1.0, .0, .0)  * pow(glare1, 12.5)*.05;
		col += bri * vec3(1.0, 1.0, 0.2) * pow(glare2, 2.0)*2.5;
		col += bri * sunColour * pow(glare3, 2.0)*3.0;
	}
	col = PostEffects(col, xy);	
	
	#ifdef STEREO	
	col *= vec3( isCyan, 1.0-isCyan, 1.0-isCyan );	
	#endif
	
	gl_FragColor=vec4(col,1.0);
}

//--------------------------------------------------------------------------