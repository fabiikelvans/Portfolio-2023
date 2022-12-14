const fragmentParticlesShader = `
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vNormal;


void main() {


    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

`

export default fragmentParticlesShader
