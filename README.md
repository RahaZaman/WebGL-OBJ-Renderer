# 🫖 Teapot Trio | WebGL OBJ Renderer  
*CSE 160 – Introduction to Computer Graphics*

## Overview

**WebGL OBJ Renderer** is a real-time 3D graphics project built with WebGL that loads and renders OBJ models directly in the browser using custom shaders, JavaScript, and GLSL. This lab demonstrates essential computer graphics concepts such as model parsing, lighting, transformation matrices, and real-time rendering.

The project features multiple teapots rendered with different colors and transformations, showcasing the ability to load external 3D assets (.obj files), apply per-vertex lighting, and manage rendering pipelines from scratch—without any 3D framework or engine.

> ✅ OBJ File Parsing • ✅ Custom GLSL Lighting • ✅ GPU Buffer Management • ✅ Multi-Model Rendering

---

## 🔧 Technologies & Tools

| Tool              | Purpose                              |
|------------------|--------------------------------------|
| **WebGL**         | Low-level 3D rendering in browser    |
| **JavaScript**    | Application logic and rendering loop |
| **GLSL**          | Vertex and fragment shader programs  |
| **OBJLoader.js**  | Parses .obj files into vertex data   |
| **Matrix4 / Vector3** | Custom math library for transformations |
| **Stats.js**      | Real-time FPS monitoring             |

---

## 🎮 How It Works

### 📁 Loading .obj Files

- Utilizes an adapted version of `OBJLoader.js` to asynchronously load `.obj` files.
- The OBJ file is parsed into arrays of:
  - Vertex positions (`v`)
  - Vertex normals (`vn`)
  - Face definitions (`f`)
- These arrays are passed to GPU buffers after parsing is complete.

### 🧱 Model Representation (`Model.js`)

Each model is encapsulated in a `Model` class, which:

- Stores the transformation matrix
- Handles vertex/normal buffer creation
- Sends data to shaders each frame

```js
this.loader = new OBJLoader(filePath);
this.loader.parseModel().then(() => {
  this.modelData = this.loader.getModelData();
  // Buffers created and populated
});
