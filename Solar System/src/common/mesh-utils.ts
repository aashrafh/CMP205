import Mesh from './mesh';
import * as OBJ from 'webgl-obj-loader';

// This file contain some helper classes to create simple meshes

const BLACK = [0, 0, 0, 255];
const RED = [255, 0, 0, 255];
const GREEN = [0, 255, 0, 255];
const BLUE = [0, 0, 255, 255];
const YELLOW = [255, 255, 0, 255];
const MAGENTA = [255, 0, 255, 255];
const CYAN = [0, 255, 255, 255];
const WHITE = [255, 255, 255, 255];

function createMesh(gl: WebGL2RenderingContext): Mesh {
    return new Mesh(gl, [
        { attributeLocation: 0, buffer: "positions", size: 3, type: gl.FLOAT, normalized: false, stride: 0, offset: 0 },
        { attributeLocation: 1, buffer: "colors", size: 4, type: gl.UNSIGNED_BYTE, normalized: true, stride: 0, offset: 0 }
    ]);
}

export function ColoredPlane(gl: WebGL2RenderingContext): Mesh {
    let mesh = createMesh(gl);
    mesh.setBufferData("positions", new Float32Array([
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.5,  0.5, 0.0,
        -0.5,  0.5, 0.0,
    ]), gl.STATIC_DRAW);
    mesh.setBufferData("colors", new Uint8Array([
        255,   0,   0, 255,
          0, 255,   0, 255,
          0,   0, 255, 255,
        255,   0, 255, 255,
    ]), gl.STATIC_DRAW);
    mesh.setElementsData(new Uint32Array([
        0, 1, 2,
        2, 3, 0
    ]), gl.STATIC_DRAW);
    return mesh
}

export function ColoredCube(gl: WebGL2RenderingContext): Mesh {
    let mesh = createMesh(gl);
    mesh.setBufferData("positions", new Float32Array([
        //Upper Face
        -1,  1, -1,
        -1,  1,  1,
         1,  1,  1,
         1,  1, -1,
        //Lower Face
        -1, -1, -1,
         1, -1, -1,
         1, -1,  1,
        -1, -1,  1,
        //Right Face
         1, -1, -1,
         1,  1, -1,
         1,  1,  1,
         1, -1,  1,
        //Left Face
        -1, -1, -1,
        -1, -1,  1,
        -1,  1,  1,
        -1,  1, -1,
        //Front Face
        -1, -1,  1,
         1, -1,  1,
         1,  1,  1,
        -1,  1,  1,
        //Back Face
        -1, -1, -1,
        -1,  1, -1,
         1,  1, -1,
         1, -1, -1
    ]), gl.STATIC_DRAW);
    mesh.setBufferData("colors", new Uint8Array([
        //Upper Face
        ...RED, ...RED, ...RED, ...RED,
        //Lower Face
        ...GREEN, ...GREEN, ...GREEN, ...GREEN,
        //Right Face
        ...BLUE, ...BLUE, ...BLUE, ...BLUE,
        //Left Face
        ...YELLOW, ...YELLOW, ...YELLOW, ...YELLOW,
        //Front Face
        ...MAGENTA, ...MAGENTA, ...MAGENTA, ...MAGENTA,
        //Back Face
        ...CYAN, ...CYAN, ...CYAN, ...CYAN,
    ]), gl.STATIC_DRAW);
    mesh.setElementsData(new Uint32Array([
        //Upper Face
        0, 1, 2, 2, 3, 0,
        //Lower Face
        4, 5, 6, 6, 7, 4,
        //Right Face
        8, 9, 10, 10, 11, 8,
        //Left Face
        12, 13, 14, 14, 15, 12,
        //Front Face
        16, 17, 18, 18, 19, 16,
        //Back Face
        20, 21, 22, 22, 23, 20, 
    ]), gl.STATIC_DRAW);
    return mesh;
}

export function WhiteCube(gl: WebGL2RenderingContext): Mesh {
    let mesh = createMesh(gl);
    mesh.setBufferData("positions", new Float32Array([
        //Upper Face
        -1,  1, -1,
        -1,  1,  1,
         1,  1,  1,
         1,  1, -1,
        //Lower Face
        -1, -1, -1,
         1, -1, -1,
         1, -1,  1,
        -1, -1,  1,
        //Right Face
         1, -1, -1,
         1,  1, -1,
         1,  1,  1,
         1, -1,  1,
        //Left Face
        -1, -1, -1,
        -1, -1,  1,
        -1,  1,  1,
        -1,  1, -1,
        //Front Face
        -1, -1,  1,
         1, -1,  1,
         1,  1,  1,
        -1,  1,  1,
        //Back Face
        -1, -1, -1,
        -1,  1, -1,
         1,  1, -1,
         1, -1, -1
    ]), gl.STATIC_DRAW);
    mesh.setBufferData("colors", new Uint8Array([
        //Upper Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
        //Lower Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
        //Right Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
        //Left Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
        //Front Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
        //Back Face
        ...WHITE, ...WHITE, ...WHITE, ...WHITE,
    ]), gl.STATIC_DRAW);
    mesh.setElementsData(new Uint32Array([
        //Upper Face
        0, 1, 2, 2, 3, 0,
        //Lower Face
        4, 5, 6, 6, 7, 4,
        //Right Face
        8, 9, 10, 10, 11, 8,
        //Left Face
        12, 13, 14, 14, 15, 12,
        //Front Face
        16, 17, 18, 18, 19, 16,
        //Back Face
        20, 21, 22, 22, 23, 20, 
    ]), gl.STATIC_DRAW);
    return mesh;
}

export function LoadOBJMesh(gl: WebGL2RenderingContext, data: string){
    let obj = new OBJ.Mesh(data);
    let mesh = createMesh(gl);
    mesh.setBufferData("positions", new Float32Array(obj.vertices), gl.STATIC_DRAW);
    let colors = new Uint8Array(obj.vertices.length * 4 / 3);
    colors.fill(255);
    mesh.setBufferData("colors", colors, gl.STATIC_DRAW);
    mesh.setElementsData(new Uint32Array(obj.indices), gl.STATIC_DRAW);
    return mesh;
}

export function ColoredSphere(gl: WebGL2RenderingContext, verticalResolution: number=32, horizontalResolution: number=32): Mesh{
    let mesh = createMesh(gl);
    const r = 1.0;

    let vertices = [];
    let colors  = [];
    
    for(let i = 0; i<=verticalResolution; ++i) {
        let theta = i * Math.PI / verticalResolution;  //-90 to 90
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);
 
        for(let j = 0; j<=horizontalResolution; ++j) {
            let phi = j * 2 * Math.PI / horizontalResolution;  //0 to 360
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);

            /*
            Note to self:
            if you used the CCW indices:
            this x, y, z is valid for the second scene (solar system) but do not valid for the sphere itself (depending on the expected output)
            using blink-diff I tried to chnage the x, y, z equation to reach the same expected output
            so if you will test the colored sphere the quations should be
            let x = sinTheta*cosPhi;
            let y = cosTheta;
            let z = sinTheta*sinPhi;
            and if you will test the solar system the eautions should be
            let x = sinTheta*cosPhi;
            let y = sinTheta*sinPhi;
            let z = cosTheta;*/
            
            let x = sinTheta*cosPhi;
            let z = sinTheta*sinPhi;
            let y = cosTheta;

            vertices.push(r*x);
            vertices.push(r*y);
            vertices.push(r*z);
 
            colors.push((x+1)/2*255);
            colors.push((y+1)/2*255);
            colors.push((z+1)/2*255);
            colors.push(255);
        }
    }


    // generate CCW index list of sphere triangles
    // indices
    //  k1--k1+1
    //  |  / |
    //  | /  |
    //  k2--k2+1
    let indices = [];
    for(let i = 0; i<verticalResolution; ++i) {
        for(let j = 0; j<horizontalResolution; ++j) {
            let first = (i * (horizontalResolution + 1)) + j;
            let second = first + horizontalResolution + 1;

            //Note that colors differ depending on the the direction of coloring the vertices if that
            //clockwise of counter-clockwise

            //first triangle
            indices.push(first+1);
            indices.push(second+1);
            indices.push(second);
            //second triangle
            indices.push(second);
            indices.push(first);
            indices.push(first+1);
        }
    }

    mesh.setBufferData("positions", new Float32Array(vertices), gl.STATIC_DRAW);
    mesh.setBufferData("colors", new Uint8Array(colors), gl.STATIC_DRAW);
    mesh.setElementsData(new Uint32Array(indices), gl.STATIC_DRAW);
    return mesh;
}