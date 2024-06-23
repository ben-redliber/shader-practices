#pragma glslify: sat = require(../sat.glsl)
#pragma glslify: specular = require(../specular.glsl)
#pragma glslify: fresnel = require(../fresnel.glsl)

uniform float u_iorRed;
uniform float u_iorGreen;
uniform float u_iorBlue;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform float u_refractPower;
uniform float u_chromaticAberration;

varying vec3 worldNormal;
varying vec3 eyeVector;

const int LOOP = 16;
const float SHININESS = 40.0;
const float DIFFUSENESS = 0.2;
const vec3 LIGHT = vec3(-1.0, 1.0, 1.0);
const float FRESNELPOWER = 10.0;

void main() {
    float iorRatioRed = 1.0 / u_iorRed;
    float iorRatioGreen = 1.0 / u_iorGreen;
    float iorRatioBlue = 1.0 / u_iorBlue;

    vec3 color = vec3(0.0);

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 normal = worldNormal;

    for (int i = 0; i < LOOP; i++) {
        float slide = float(i) / float(LOOP) * 0.1;

        vec3 refractVecR = refract(eyeVector, normal, iorRatioRed);
        vec3 refractVecG = refract(eyeVector, normal, iorRatioGreen);
        vec3 refractVecB = refract(eyeVector, normal, iorRatioBlue);

        color.r += texture2D(u_texture, uv + refractVecR.xy * (u_refractPower + slide * 1.0) * u_chromaticAberration).r;
        color.g += texture2D(u_texture, uv + refractVecG.xy * (u_refractPower + slide * 2.0) * u_chromaticAberration).g;
        color.b += texture2D(u_texture, uv + refractVecB.xy * (u_refractPower + slide * 3.0) * u_chromaticAberration).b;

        color = sat(color, 1.05);
    }

    color /= float(LOOP);

    float specularLight = specular(LIGHT, SHININESS, DIFFUSENESS, worldNormal, eyeVector);
    color += specularLight;

    float f = fresnel(eyeVector, normal, FRESNELPOWER);
    color.rgb += f * vec3(1.0);

    gl_FragColor = vec4(color, 1.0);
}
