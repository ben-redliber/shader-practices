uniform vec2 u_resolution;
uniform sampler2D u_texture;

varying vec3 worldNormal;
varying vec3 eyeVector;

void main() {
    float iorRatio = 1.0 / 1.025;
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 normal = worldNormal;

    vec3 refractVec = refract(eyeVector, normal, iorRatio);

    vec4 color = texture2D(u_texture, uv + refractVec.xy);

    gl_FragColor = color;
}
