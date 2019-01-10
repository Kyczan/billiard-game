class Canvas {
  constructor(canvas) {
    this.canvas = document.getElementById(canvas);
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
  }

  getCtx() {
    return this.context;
  }

  setDimensions(w = 300, h = 150) {
    this.canvas.width = w;
    this.canvas.height = h;
  }
}

export default Canvas;
