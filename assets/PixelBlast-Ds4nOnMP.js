import{E as e,F as t,J as n,P as r,R as i,_ as a,_t as o,ht as s,ot as c,q as l,x as u}from"./vue-CavnjMU1.js";import{_ as d,a as f,c as p,d as m,f as h,g,h as _,i as v,l as y,m as b,n as x,o as S,p as C,r as w,s as T,t as E,u as D}from"./vendor~PixelBlast-BKkG6a5N.js";import{x as O}from"./vendor~app~1.C语言入门~vscode_EIDE 替代 keil~vscode_cmake 编译 stm32~PixelBlast-DSG35aZB.js";import{r as k}from"./app-nHQlwzAy.js";var A=`
void main() {
  gl_Position = vec4(position, 1.0);
}
`,j=`
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;
  fragColor = vec4(color, M);
}
`,M=10,N=k(e({__name:`PixelBlast`,props:{variant:{default:`square`},pixelSize:{default:4},color:{default:``},className:{},style:{},antialias:{type:Boolean,default:!0},patternScale:{default:2},patternDensity:{default:1},liquid:{type:Boolean,default:!1},liquidStrength:{default:.1},liquidRadius:{default:1},pixelSizeJitter:{default:0},enableRipples:{type:Boolean,default:!0},rippleIntensityScale:{default:1},rippleThickness:{default:.1},rippleSpeed:{default:.3},liquidWobbleSpeed:{default:4.5},autoPauseOffscreen:{type:Boolean,default:!0},speed:{default:.5},transparent:{type:Boolean,default:!0},edgeFade:{default:.5},noiseAmount:{default:0},backgroundImage:{},backgroundAttachment:{}},setup(e){let k=e;function N(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`);if(!t)throw Error(`2D context not available`);t.fillStyle=`black`,t.fillRect(0,0,e.width,e.height);let n=new _(e);n.minFilter=y,n.magFilter=y,n.generateMipmaps=!1;let r=[],i=null,a=6.4,o=()=>{t.fillStyle=`black`,t.fillRect(0,0,e.width,e.height)},s=e=>{let n={x:e.x*64,y:(1-e.y)*64},r=1;r=e.age<19.2?(e=>Math.sin(e*Math.PI/2))(e.age/19.2):(e=>-e*(e-2))(1-(e.age-19.2)/44.8)||0,r*=e.force;let i=`${(e.vx+1)/2*255}, ${(e.vy+1)/2*255}, ${r*255}`;t.shadowOffsetX=320,t.shadowOffsetY=320,t.shadowBlur=a,t.shadowColor=`rgba(${i},${.22*r})`,t.beginPath(),t.fillStyle=`rgba(255,0,0,1)`,t.arc(n.x-320,n.y-320,a,0,Math.PI*2),t.fill()};return{canvas:e,texture:n,addTouch:e=>{let t=0,n=0,a=0;if(i){let r=e.x-i.x,o=e.y-i.y;if(r===0&&o===0)return;let s=r*r+o*o,c=Math.sqrt(s);n=r/(c||1),a=o/(c||1),t=Math.min(s*1e4,1)}i={x:e.x,y:e.y},r.push({x:e.x,y:e.y,age:0,force:t,vx:n,vy:a})},update:()=>{o();for(let e=r.length-1;e>=0;e--){let t=r[e],n=t.force*.015625*(1-t.age/64);t.x+=t.vx*n,t.y+=t.vy*n,t.age++,t.age>64&&r.splice(e,1)}for(let e=0;e<r.length;e++)s(r[e]);n.needsUpdate=!0},set radiusScale(e){a=6.4*e},get radiusScale(){return a/6.4},size:64}}function P(e,t){return new E(`LiquidEffect`,`
    uniform sampler2D uTexture;
    uniform float uStrength;
    uniform float uTime;
    uniform float uFreq;

    void mainUv(inout vec2 uv) {
      vec4 tex = texture2D(uTexture, uv);
      float vx = tex.r * 2.0 - 1.0;
      float vy = tex.g * 2.0 - 1.0;
      float intensity = tex.b;

      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);

      float amt = uStrength * intensity * wave;

      uv += vec2(vx, vy) * amt;
    }
    `,{uniforms:new Map([[`uTexture`,new g(e)],[`uStrength`,new g(t?.strength??.025)],[`uTime`,new g(0)],[`uFreq`,new g(t?.freq??4.5)]])})}let F={square:0,circle:1,triangle:2,diamond:3},I=O(`--vp-c-brand-1`,`#5086a1`),L=a(()=>k.color||I.value),R=l(`containerRef`),z=c({visible:!0}),B=c(k.speed),V=c(null),H=c(null),U=null;function W(){let e=R.value;if(!e)return;B.value=k.speed;let t=[`antialias`,`liquid`,`noiseAmount`],n={antialias:k.antialias,liquid:k.liquid,noiseAmount:k.noiseAmount},r=!1;if(!V.value)r=!0;else if(H.value){for(let e of t)if(H.value[e]!==n[e]){r=!0;break}}if(r){if(V.value){let t=V.value;t.resizeObserver?.disconnect(),cancelAnimationFrame(t.raf),t.quad?.geometry.dispose(),t.material.dispose(),t.composer?.dispose(),t.renderer.dispose(),t.renderer.domElement.parentElement===e&&e.removeChild(t.renderer.domElement),V.value=null}let t=document.createElement(`canvas`),n=t.getContext(`webgl2`,{antialias:k.antialias,alpha:!0});if(!n)return;let r=new f({canvas:t,context:n,antialias:k.antialias,alpha:!0});r.domElement.style.width=`100%`,r.domElement.style.height=`100%`,r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),e.appendChild(r.domElement);let i={uResolution:{value:new d(0,0)},uTime:{value:0},uColor:{value:new T(L.value)},uClickPos:{value:Array.from({length:M},()=>new d(-1,-1))},uClickTimes:{value:new Float32Array(M)},uShapeType:{value:F[k.variant]??0},uPixelSize:{value:k.pixelSize*r.getPixelRatio()},uScale:{value:k.patternScale},uDensity:{value:k.patternDensity},uPixelJitter:{value:k.pixelSizeJitter},uEnableRipples:{value:+!!k.enableRipples},uRippleSpeed:{value:k.rippleSpeed},uRippleThickness:{value:k.rippleThickness},uRippleIntensity:{value:k.rippleIntensityScale},uEdgeFade:{value:k.edgeFade}},a=new C,o=new m(-1,1,1,-1,0,1),s=new b({vertexShader:A,fragmentShader:j,uniforms:i,transparent:!0,glslVersion:p,depthTest:!1,depthWrite:!1}),c=new h(2,2),l=new D(c,s);a.add(l);let u=new S,_=()=>{let t=e.clientWidth||1,n=e.clientHeight||1;r.setSize(t,n,!1),i.uResolution.value.set(r.domElement.width,r.domElement.height),V.value?.composer&&V.value.composer.setSize(r.domElement.width,r.domElement.height),i.uPixelSize.value=k.pixelSize*r.getPixelRatio()};_();let y=new ResizeObserver(_);y.observe(e);let O=(()=>{if(typeof window<`u`&&window.crypto?.getRandomValues){let e=new Uint32Array(1);return window.crypto.getRandomValues(e),e[0]/4294967295}return Math.random()})()*1e3,I,R,H;if(k.liquid){R=N(),R.radiusScale=k.liquidRadius,I=new x(r);let e=new v(a,o);H=P(R.texture,{strength:k.liquidStrength,freq:k.liquidWobbleSpeed});let t=new w(o,H);t.renderToScreen=!0,I.addPass(e),I.addPass(t)}if(k.noiseAmount>0){I||(I=new x(r),I.addPass(new v(a,o)));let e=new E(`NoiseEffect`,`uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} `,{uniforms:new Map([[`uTime`,new g(0)],[`uAmount`,new g(k.noiseAmount)]])}),t=new w(o,e);t.renderToScreen=!0,I&&I.passes.length>0&&I.passes.forEach(e=>{`renderToScreen`in e&&(e.renderToScreen=!1)}),I.addPass(t)}I&&I.setSize(r.domElement.width,r.domElement.height);let U=e=>{let t=r.domElement.getBoundingClientRect(),n=r.domElement.width/t.width,i=r.domElement.height/t.height;return{fx:(e.clientX-t.left)*n,fy:(t.height-(e.clientY-t.top))*i,w:r.domElement.width,h:r.domElement.height}};r.domElement.addEventListener(`pointerdown`,e=>{let{fx:t,fy:n}=U(e),r=V.value?.clickIx??0;i.uClickPos.value[r].set(t,n),i.uClickTimes.value[r]=i.uTime.value,V.value&&(V.value.clickIx=(r+1)%M)},{passive:!0}),r.domElement.addEventListener(`pointermove`,e=>{if(!R)return;let{fx:t,fy:n,w:r,h:i}=U(e);R.addTouch({x:t/r,y:n/i})},{passive:!0});let W=0,G=()=>{k.autoPauseOffscreen&&!z.value.visible||(i.uTime.value=O+u.getElapsedTime()*B.value,H&&(H.uniforms.get(`uTime`).value=i.uTime.value),I?(R&&R.update(),I.passes.forEach(e=>{e instanceof w&&e.effects?.forEach(e=>{let t=e.uniforms.get(`uTime`);t&&(t.value=i.uTime.value)})}),I.render()):r.render(a,o)),W=requestAnimationFrame(G)};W=requestAnimationFrame(G),V.value={renderer:r,scene:a,camera:o,material:s,clock:u,clickIx:0,uniforms:i,resizeObserver:y,raf:W,quad:l,timeOffset:O,composer:I,touch:R,liquidEffect:H}}else{let e=V.value;if(e.uniforms.uShapeType.value=F[k.variant]??0,e.uniforms.uPixelSize.value=k.pixelSize*e.renderer.getPixelRatio(),e.uniforms.uColor.value.set(L.value),e.uniforms.uScale.value=k.patternScale,e.uniforms.uDensity.value=k.patternDensity,e.uniforms.uPixelJitter.value=k.pixelSizeJitter,e.uniforms.uEnableRipples.value=+!!k.enableRipples,e.uniforms.uRippleIntensity.value=k.rippleIntensityScale,e.uniforms.uRippleThickness.value=k.rippleThickness,e.uniforms.uRippleSpeed.value=k.rippleSpeed,e.uniforms.uEdgeFade.value=k.edgeFade,k.transparent?e.renderer.setClearAlpha(0):e.renderer.setClearColor(0,1),e.liquidEffect){let t=e.liquidEffect?.uniforms.get(`uStrength`);t&&(t.value=k.liquidStrength);let n=e.liquidEffect?.uniforms.get(`uFreq`);n&&(n.value=k.liquidWobbleSpeed)}e.touch&&(e.touch.radiusScale=k.liquidRadius)}H.value=n,U=()=>{if(V.value&&r||!V.value)return;let t=V.value;t.resizeObserver?.disconnect(),cancelAnimationFrame(t.raf),t.quad?.geometry.dispose(),t.material.dispose(),t.composer?.dispose(),t.renderer.dispose(),t.renderer.domElement.parentElement===e&&e.removeChild(t.renderer.domElement),V.value=null}}return t(()=>{W()}),r(()=>{U?.()}),n(()=>[k.variant,k.pixelSize,k.color,k.antialias,k.patternScale,k.patternDensity,k.liquid,k.liquidStrength,k.liquidRadius,k.pixelSizeJitter,k.enableRipples,k.rippleIntensityScale,k.rippleThickness,k.rippleSpeed,k.liquidWobbleSpeed,k.autoPauseOffscreen,k.speed,k.transparent,k.edgeFade,k.noiseAmount],()=>{U?.(),W()}),(t,n)=>(i(),u(`div`,{ref_key:`containerRef`,ref:R,class:s([`home-hero-effect-pixel-blast`,[e.className]]),style:o(e.style),"aria-label":`PixelBlast interactive background`},null,6))}}),[[`__scopeId`,`data-v-9c77f68e`]]);export{N as default};