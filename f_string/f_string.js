// WebGL - 2D Geometry Matrix Transform - Centered F Rotation
"use strict";

import {createShader} from "./webgl_comp_linker.js";
import {m4, degToRad} from "./matrix_translation.js";
import * as shapes from "./shapes.js";


// Set z axis behind the object so that it can be seen
let translation = [0, 0, -500]
let rotation = [degToRad(40), degToRad(25), degToRad(325)];
let scale = [1, 1, 1];
let fieldOfViewRadians = degToRad(60)
let gl;
let matrixLocation;

let timeLapse = 0;
let rotationVelocity = 0;

let drawnObject;
let shapeQueue = [
    shapes.populateCube,
    shapes.populateF,
    shapes.setSphereCoords
];

let speedQueue = [0, 1.2, 3, 100];

function onShapeSelect() {
    drawnObject = shapeQueue[Number(document.getElementById("shapeDiv").value)](gl);
}

function onSpeedSelect() {
    rotationVelocity = speedQueue[Number(document.getElementById("speedDiv").value)];
}


function main_func() {
    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    let canvas = document.querySelector("#canvas");
    gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    // setup GLSL program
    let program = createShader(gl);

    // look up where the vertex data needs to go.
    let positionLocation = gl.getAttribLocation(program, "a_position");
    let colorLocation = gl.getAttribLocation(program, "a_color");
    matrixLocation = gl.getUniformLocation(program, "u_matrix");

    // Set the default values for the page
    document.getElementById("shapeDiv").value = "0";
    document.getElementById("shapeDiv").onchange = onShapeSelect;

    document.getElementById("speedDiv").value = "0";
    document.getElementById("speedDiv").onchange = onSpeedSelect;
    
    onShapeSelect();
    onSpeedSelect();

    requestAnimationFrame(drawScene);

    // Draw the scene.
    function drawScene(timeSinceLoad) {

        // Convert frametime to seconds
        timeSinceLoad *= 0.001
        let deltaTime = timeSinceLoad - timeLapse;
        timeLapse = timeSinceLoad;

        // Enable CULL and Depth test
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);

        // Turn on the attribute
        gl.enableVertexAttribArray(positionLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, drawnObject.positionBuffer);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        let size = 3;          // 3 components per iteration
        let type = gl.FLOAT;   // the data is 32bit floats
        let normalize = false; // don't normalize the data
        let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        let offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            positionLocation, size, type, normalize, stride, offset);

        // Turn on the color attribute
        gl.enableVertexAttribArray(colorLocation);

        // Bind the color buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, drawnObject.colorBuffer);

        // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
        size = 3;                 // 3 components per iteration
        type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
        normalize = true;         // normalize the data (convert from 0-255 to 0-1)
        stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
        offset = 0;               // start at the beginning of the buffer
        gl.vertexAttribPointer(
            colorLocation, size, type, normalize, stride, offset);

        let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        let zNear = 1;
        let zFar = 1000;
        let matrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
        matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
        matrix = m4.xRotate(matrix, rotation[0]);
        matrix = m4.yRotate(matrix, rotation[1]);
        matrix = m4.zRotate(matrix, rotation[2]);
        matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);

        // Set the matrix.
        gl.uniformMatrix4fv(matrixLocation, false, matrix);

        // Draw the geometry.
        drawnObject.drawObj();

        rotation[0] += deltaTime * rotationVelocity;
        rotation[1] += deltaTime * rotationVelocity;
        rotation[2] += deltaTime * rotationVelocity;
        requestAnimationFrame(drawScene);
    }
}


main_func();