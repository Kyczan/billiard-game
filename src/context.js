class Context {
  constructor(canvas = 'game') {
    this.context = document.getElementById(canvas).getContext('2d');
    this.context.imageSmoothingEnabled = false;
  }
  getCtx() {
    return this.context;
  }
}

export default Context;
