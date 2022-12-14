

const vertexParticlesShader = `

uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vNormal;


void main() {
  
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}

`

export default vertexParticlesShader