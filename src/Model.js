import { Matrix4 } from "../lib/cuon-matrix";
import { OBJLoader } from "../lib/OBJLoader";

export default class Model {
  constructor(gl, filePath) {
    this.filepath = filePath;
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();

    this.loader = new OBJLoader(this.filepath);
    this.loader.parseModel().then(() => {
      this.modelData = this.loader.getModelData();

      this.vertexBuffer = gl.createBuffer();
      this.normalBuffer = gl.createBuffer();

      if (!this.vertexBuffer || !this.normalBuffer) {
        console.log("Failed to create buffers for", this.filepath);
      }
      // console.log(this.modelData);
    });
  }

  render(gl, program) {
    // if the .obj file hasn't been fully parsed yet, skip rendering this frame
    if (!this.loader.isFullyLoaded) return;

    // vertices
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.modelData.vertices),
      gl.DYNAMIC_DRAW
    );
    gl.vertexAttribPointer(program.a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.a_Position);

    // normals
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.modelData.normals),
      gl.DYNAMIC_DRAW
    );
    gl.vertexAttribPointer(program.a_Normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.a_Normal);

    // set uniforms
    gl.uniformMatrix4fv(program.u_ModelMatrix, false, this.matrix.elements);
    gl.uniform4fv(program.u_FragColor, this.color);

    let normalMatrix = new Matrix4().setInverseOf(this.matrix);
    normalMatrix.transpose();
    gl.uniformMatrix4fv(program.u_NormalMatrix, false, normalMatrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, this.modelData.vertices.length / 3);
  }
}
