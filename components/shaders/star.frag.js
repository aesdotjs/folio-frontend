export default `
precision highp float;
#define PI 3.1415926
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform float time;
uniform vec2 resolution;

vec3 getColor(float c){
  float r = cos((c-0.75)*PI);
  float g = cos((c-0.55)*PI);
  float b = cos((c-0.25)*PI);
  return vec3(r,g,b);
}

mat2 rot2D(float a){
  float c = cos(a);
  float s = cos(a);
  return mat2(c,s,-s,c); 
}

float hash1(vec2 p){
  vec2 v = vec2(PI*1453.0,exp(1.)*3054.0);
  return fract(sin(dot(p,v)*0.005)*4323.0);
}

vec2 hash2(vec2 p){
  vec2 v = vec2(hash1(p),hash1(p*p));   
  return v+v*rot2D(time*0.5); 
}

void star(inout vec3 col,vec2 uv){
  float v =0.0;
  
    
  v+=abs(0.5)/length(uv-70.*vec2(hash2(uv*1.0)));
    
  col+= getColor(0.34)*v*1.4; 
}
void drawMeteor(inout vec3 col, in vec2 uv,vec2 startP,vec2 endP,float linWidth){

 uv*=3.0;
 vec2 lineDir=endP-startP;
 vec2 fragDir=uv-startP;
 
 // keep the line coefficient bewteen [0,1] so that the projective dir on the 
 // lineDir will not exceed or we couldn't get a line segment but a line.
 float lineCoe=clamp(dot(lineDir,fragDir)/dot(lineDir,lineDir),0.,1.0);
                     
 vec2 projDir=lineCoe*lineDir;
  
 vec2 fragToLineDir= fragDir- projDir;
  
 float dis=length(fragToLineDir);
 float disToTail = length(projDir);
 dis=linWidth/dis;
   
 col += dis*getColor(0.3)*pow(disToTail,3.0);
  
}

void drawMeteors(inout vec3 col,vec2 uv){
  
  vec2 dir = normalize(vec2(-1.0,-0.5));
  vec2 mv  = -dir*cos(mod(time*2.,PI))*35.0;
  vec2 sp  = vec2(10.0+100.0*hash1(vec2(floor(time*2./PI))),10.0);
  vec2 ep  = sp+dir*5.0;

  drawMeteor(col,uv,sp+mv,ep+mv,0.0005);

}


void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/filterArea.xy;
    vec2 cuv = uv - vec2(0.5);
    cuv.x *= filterArea.x/filterArea.y;
    cuv.y *= -1.0;
    // Time varying pixel color
    vec3 col = vec3(0.);
    cuv *=10.;
    star(col,uv);
    drawMeteors(col,cuv);
    // Output to screen
    gl_FragColor = vec4(col,1.0);
    if(col.r + col.g + col.b < 1.) gl_FragColor.a = .0;
}`;