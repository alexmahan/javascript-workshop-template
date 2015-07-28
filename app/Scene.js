import PIXI from 'pixi.js';
import { autobind } from 'core-decorators';

export default class Scene {
  constructor(core) {
    this.core = core;

    let bunnyTexture = PIXI.Texture.fromImage('bunny.png');
    this.bunny = new PIXI.Sprite(bunnyTexture);

    this.core.container.addChild(this.bunny);

    this.core.on('frame', this.onFrame);
  }

  @autobind
  onFrame(delta) {
    this.bunny.rotation = this.bunny.rotation + (0.005 * delta);
  }
}
