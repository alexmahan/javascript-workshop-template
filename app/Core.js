import PIXI from 'pixi.js';
import { autobind } from 'core-decorators';

export default class Core {

  constructor() {
    this.isRunning = false;
    this.frameCallbacks = [];
  }

  attach(elem) {
    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);

    this.stage = new PIXI.Container();

    this.container = new PIXI.Container();
    this.stage.addChild(this.container);

    this.resize();
    elem.appendChild(this.renderer.view);
  }

  start() {
    if (this.isRunning) { return; }

    this.isRunning = true;

    this.lastTimestamp = performance.now();

    this.render();

    window.addEventListener('resize', this.resize);
  }

  stop() {
    if (!this.isRunning) { return; }

    this.isRunning = false;

    window.removeEventListener('resize', this.resize);
  }

  onFrame(cb) {
    this.frameCallbacks.push(cb);
  }

  @autobind
  render(ts) {
    if (!this.isRunning) { return; }

    let delta = (ts || this.lastTimestamp) - (this.lastTimestamp || 0);
    this.lastTimestamp = ts;

    requestAnimationFrame(this.render);

    for (let i = 0; i < this.frameCallbacks.length; i++) {
      this.frameCallbacks[i](delta);
    }

    this.renderer.render(this.stage);
  }

  @autobind
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.container.position.x = this.width / 2.0;
    this.container.position.y = this.height / 2.0;

    this.renderer.resize(this.width, this.height);
  }
}
