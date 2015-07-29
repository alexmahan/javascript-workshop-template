import { autobind } from 'core-decorators';
import Paddle from 'app/components/Paddle';

export default class Scene {
  constructor(core) {
    this.core = core;

    this.leftPaddle = new Paddle(-100);
    this.rightPaddle = new Paddle(100);

    this.leftPaddle.append(this.core.container);
    this.rightPaddle.append(this.core.container);

    this.core.on('frame', this.onFrame);
  }

  @autobind
  onFrame(delta) {
    this.leftPaddle.update(delta);
    this.rightPaddle.update(delta);
  }
}
