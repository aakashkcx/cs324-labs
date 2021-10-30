var gl;
var vertices = [];
var count_vert = 0;

function main() {
  var canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  //******************************************************************/
  // Your code here
  // Notice that there are 2 global variables, you need to update these:
  // vertices=[];
  // count_vert=0;
  // Option 1:
  // assign values to vertices variable (specify how many )
  // Option 2:
  // define function:
  // createVertices(startX, startY, endX, thickness)

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //  Load shaders and initialize attribute buffers
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Load the data into the GPU

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  render();
}

//function createVertices(startX, startY, endX, thickness){
// notice that JavaScript has some issue handling floats.
// I recommend to multiply by 100 the startX and endX values
// and then divide when appending to vertices vector
//}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  // draw a triangles starting from index 0 and
  // using 3 indices
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, count_vert);
}
