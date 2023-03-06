export function populateCube(gl) {
    let sides = 6;
    let vertexPerSize = 6;

    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCubeCoords(gl);

    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCubeColor(gl);

    return {
        sides: sides * vertexPerSize,
        positionBuffer: positionBuffer,
        colorBuffer: colorBuffer,
        drawObj: function() {
            gl.drawArrays(gl.TRIANGLES, 0, this.sides);
        }
    }
}

export function populateF(gl) {
    let sides = 16;
    let vertexPerSize = 6;

    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setFSampleCoords(gl);

    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setFSampleColor(gl);

    return {
        sides: sides * vertexPerSize,
        positionBuffer: positionBuffer,
        colorBuffer: colorBuffer,
        drawObj: function() {
            gl.drawArrays(gl.TRIANGLES, 0, this.sides);
        }
    }
}

export function setSphereCoords(gl) {
    let SPHERE_DIV = 6;
    let i, ai, si, ci;
    let j, aj, sj, cj;
    let p1, p2;
    let vertices = [], indices = [];
    for (j = 0; j <= SPHERE_DIV; j++) {
        aj = j * Math.PI / SPHERE_DIV;
        sj = Math.sin(aj);
        cj = Math.cos(aj);
        for (i = 0; i <= SPHERE_DIV; i++) {
            ai = i * 2 * Math.PI / SPHERE_DIV;
            si = Math.sin(ai);
            ci = Math.cos(ai);
            vertices.push(100 * (si * sj));  // X
            vertices.push(100 * cj);       // Y
            vertices.push(100 * (ci * sj));  // Z
        }
    }

    for (j = 0; j < SPHERE_DIV; j++) {
        for (i = 0; i < SPHERE_DIV; i++) {
            p1 = j * (SPHERE_DIV + 1) + i;
            p2 = p1 + (SPHERE_DIV + 1);
            indices.push(p1);
            indices.push(p2);
            indices.push(p1 + 1);
            indices.push(p1 + 1);
            indices.push(p2);
            indices.push(p2 + 1);
        }
    }
    
    console.log(vertices);
    
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    

    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setFSampleColor(gl);

    return {
        sides: indices.length,
        positionBuffer: positionBuffer,
        colorBuffer: colorBuffer,
        drawObj: function() {
            gl.drawElements(gl.TRIANGLES, this.sides, gl.UNSIGNED_SHORT, 0);
        }
    }
}

function setCubeCoords(gl) {
    let sides = 6;
    let vertexPerSize = 6;
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array([
            0, 0, 0,
            0, 100, 0,
            100, 0, 0,
            0, 100, 0,
            100, 100, 0,
            100, 0, 0,

            0, 0, 100,
            100, 0, 100,
            0, 100, 100,
            0, 100, 100,
            100, 0, 100,
            100, 100, 100,

            0, 100, 0,
            0, 100, 100,
            100, 100, 0,
            0, 100, 100,
            100, 100, 100,
            100, 100, 0,

            0, 0, 0,
            100, 0, 0,
            0, 0, 100,
            0, 0, 100,
            100, 0, 0,
            100, 0, 100,

            0, 0, 0,
            0, 0, 100,
            0, 100, 0,
            0, 0, 100,
            0, 100, 100,
            0, 100, 0,

            100, 0, 0,
            100, 100, 0,
            100, 0, 100,
            100, 0, 100,
            100, 100, 0,
            100, 100, 100,


        ]), gl.STATIC_DRAW);
    return sides * vertexPerSize;
}

function setCubeColor(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array([
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,


            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,

            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,

            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,

            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,

            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220]),
        gl.STATIC_DRAW);
}

function setFSampleCoords(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            0, 0, 0,
            0, 150, 0,
            30, 0, 0,
            0, 150, 0,
            30, 150, 0,
            30, 0, 0,

            30, 0, 0,
            30, 30, 0,
            100, 0, 0,
            30, 30, 0,
            100, 30, 0,
            100, 0, 0,

            30, 60, 0,
            30, 90, 0,
            67, 60, 0,
            30, 90, 0,
            67, 90, 0,
            67, 60, 0,

            0, 0, 30,
            30, 0, 30,
            0, 150, 30,
            0, 150, 30,
            30, 0, 30,
            30, 150, 30,

            30, 0, 30,
            100, 0, 30,
            30, 30, 30,
            30, 30, 30,
            100, 0, 30,
            100, 30, 30,

            30, 60, 30,
            67, 60, 30,
            30, 90, 30,
            30, 90, 30,
            67, 60, 30,
            67, 90, 30,

            0, 0, 0,
            100, 0, 0,
            100, 0, 30,
            0, 0, 0,
            100, 0, 30,
            0, 0, 30,

            100, 0, 0,
            100, 30, 0,
            100, 30, 30,
            100, 0, 0,
            100, 30, 30,
            100, 0, 30,

            30, 30, 0,
            30, 30, 30,
            100, 30, 30,
            30, 30, 0,
            100, 30, 30,
            100, 30, 0,

            30, 30, 0,
            30, 60, 30,
            30, 30, 30,
            30, 30, 0,
            30, 60, 0,
            30, 60, 30,

            30, 60, 0,
            67, 60, 30,
            30, 60, 30,
            30, 60, 0,
            67, 60, 0,
            67, 60, 30,

            67, 60, 0,
            67, 90, 30,
            67, 60, 30,
            67, 60, 0,
            67, 90, 0,
            67, 90, 30,

            30, 90, 0,
            30, 90, 30,
            67, 90, 30,
            30, 90, 0,
            67, 90, 30,
            67, 90, 0,

            30, 90, 0,
            30, 150, 30,
            30, 90, 30,
            30, 90, 0,
            30, 150, 0,
            30, 150, 30,

            0, 150, 0,
            0, 150, 30,
            30, 150, 30,
            0, 150, 0,
            30, 150, 30,
            30, 150, 0,

            0, 0, 0,
            0, 0, 30,
            0, 150, 30,
            0, 0, 0,
            0, 150, 30,
            0, 150, 0]),
        gl.STATIC_DRAW);
    return 16 * 6;
}

function setFSampleColor(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array([
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,

            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,

            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,

            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,

            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,

            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,

            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,

            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,

            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,

            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,

            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,

            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,

            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220]),
        gl.STATIC_DRAW);
}
