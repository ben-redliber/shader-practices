uniform vec2 u_resolution;
uniform float u_time;

varying vec2 vUv;
varying float vZ;

vec3 colorA = vec3(0.912, 0.191, 0.652);
vec3 colorB = vec3(1.000, 0.777, 0.052);

void main() {
    // vec2 st = gl_FragCoord.xy / u_resolution.xy;
    // float stx = clamp(st.x * 1.5, 0.1, 1.0);
    // float sty = clamp(st.y * 1.5, 0.25, 1.0);

    vec3 colors = mix(colorA, colorB, vZ * vUv.x * 3.0);

    gl_FragColor = vec4(colors, 1.0);
}
