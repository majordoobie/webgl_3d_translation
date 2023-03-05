"use strict";

/**
 * Compile and link the shaders for the program by searching for the static stings "vertex-shader" and "fragment-shader"
 * @param webGL webGL context with the canvas already attached
 * @returns {WebGLProgram} Compiled and Linked shader program
 */
export function createShader(webGL)
{
    let vertexShaderSource = document.getElementById("vertex-shader").text;
    let fragmentShaderSource = document.getElementById("fragment-shader").text;

    let vsh = webGL.createShader(webGL.VERTEX_SHADER);
    webGL.shaderSource(vsh, vertexShaderSource);
    webGL.compileShader(vsh);
    if (!webGL.getShaderParameter(vsh, webGL.COMPILE_STATUS)) {
        throw new Error("Error in vertex shader:  " + webGL.getShaderInfoLog(vsh));
    }
    let fsh = webGL.createShader(webGL.FRAGMENT_SHADER);
    webGL.shaderSource(fsh, fragmentShaderSource);
    webGL.compileShader(fsh);
    if (!webGL.getShaderParameter(fsh, webGL.COMPILE_STATUS)) {
        throw new Error("Error in fragment shader:  " + webGL.getShaderInfoLog(fsh));
    }
    let prog = webGL.createProgram();
    webGL.attachShader(prog, vsh);
    webGL.attachShader(prog, fsh);
    webGL.linkProgram(prog);
    if (!webGL.getProgramParameter(prog, webGL.LINK_STATUS)) {
        throw new Error("Link error in program:  " + webGL.getProgramInfoLog(prog));
    }
    return prog;

}