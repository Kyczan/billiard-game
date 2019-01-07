class Context {
  constructor(canvas = 'game') {
    this.context = document.getElementById(canvas).getContext('2d');
    this.context.imageSmoothingEnabled = false;
  }
  getCtx() {
    return this.context;
  }
}

const context = canvas => new Context(canvas).getCtx();

export default context;
