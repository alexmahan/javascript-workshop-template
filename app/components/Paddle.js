import PIXI from 'pixi.js';
import { autobind } from 'core-decorators';

const UP_KEY = 38;
const DOWN_KEY = 40;
const IMPULSE = 0.2;

export default class Paddle {
  constructor(x) {
    this.x = x;
    this.y = 0.0;

    this.velocity = 0.0;

    this.view = new PIXI.Sprite(PIXI.Texture.fromImage('bunny.png'));
    this.view.anchor.x = this.view.anchor.y = 0.5;

    window.addEventListener('keyup', this.onKeyPress);
  }

  @autobind
  onKeyPress(e) {
    if (e.keyCode === UP_KEY) {
      this.velocity = -IMPULSE;
    } else if (e.keyCode === DOWN_KEY) {
      this.velocity = IMPULSE;
    }
  }

  update(delta) {
    let nextYPosition = this.y + (this.velocity * delta);

    let topY = -(window.innerHeight / 2.0);
    let bottomY = +(window.innerHeight / 2.0);

    if ((nextYPosition < topY) || (nextYPosition > bottomY)) {
      this.velocity = 0.0;
    } else {
      this.y = nextYPosition;
    }

    this.view.position.x = this.x;
    this.view.position.y = this.y;
  }

  append(parent) {
    parent.addChild(this.view);
  }
}
