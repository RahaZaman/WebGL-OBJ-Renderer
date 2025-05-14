import {
  setupWebGL,
  connectVariablesToGLSL,
  camera,
  projectionMatrix,
  viewMatrix,
  stats,
} from "./Setup";
import Model from "./Model";
import { Matrix4 } from "../lib/cuon-matrix";

// set up webgl variables
let gl = setupWebGL();
let program = connectVariablesToGLSL(gl);
gl.clearColor(0, 0, 0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// load obj
let teapot = new Model(gl, "teapot.obj");

// prettier-ignore
function renderAllShapes(time) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  stats.begin();

  // send uniforms to shader
  gl.uniformMatrix4fv(program.u_ProjectionMatrix, false, projectionMatrix.elements);
  gl.uniformMatrix4fv(program.u_ViewMatrix, false, viewMatrix.elements);
  gl.uniform3fv(program.u_CameraPos, camera.eye);

  /* Render obj */

  // --- Render Blue Teapot ---
  teapot.color = [0.0, 0.0, 1.0, 1.0]; // Blue
  teapot.matrix = new Matrix4(); 
  // teapot.matrix.setScale(0.5, 0.5, 0.5);
  teapot.matrix.setScale(0.45, 0.45, 0.45);
  teapot.matrix.rotate(180, 0, 1, 0);
  teapot.matrix.translate(0, 0, 0); 
  teapot.render(gl, program);

  // --- Render Red Teapot ---
  teapot.color = [1.0, 0.0, 0.0, 1.0]; // Red
  teapot.matrix = new Matrix4(); 
  // teapot.matrix.setScale(0.5, 0.5, 0.5);
  teapot.matrix.setScale(0.45, 0.45, 0.45);
  teapot.matrix.rotate(180, 0, 1, 0);
  teapot.matrix.translate(-7, 0, 0);
  teapot.render(gl, program);

  // --- Render Green Teapot ---
  teapot.color = [0.0, 1.0, 0.0, 1.0]; // Green
  teapot.matrix = new Matrix4();
  teapot.matrix.setScale(0.45, 0.45, 0.45);
  teapot.matrix.rotate(180, 0, 1, 0);
  teapot.matrix.translate(7, 0, 0);
  teapot.render(gl, program);

  stats.end();
  requestAnimationFrame(renderAllShapes);
}

renderAllShapes();
