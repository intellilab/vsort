import { tick } from '../utils';

const colorActive = '#8870FF';
const colorNormal = '#E0E4CC';
const colorSorted = '#64DDBB';

export default class BaseSorter {
  constructor(canvas, array) {
    this.canvas = canvas;
    this.data = array.map(value => ({
      value,
      active: false,
    }));
  }

  async activate(...args) {
    this.data.forEach(item => {
      item.color = colorNormal;
    });
    args.forEach(i => {
      this.data[i].color = colorActive;
    });
    await this.tick();
  }

  async swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    await this.activate(i, j);
  }

  async finish() {
    this.data.forEach(item => {
      item.color = colorSorted;
    });
    await this.tick();
  }

  render() {
    const { canvas, data } = this;
    const { width, height } = canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    const uw = canvas.width / data.length;
    const uh = canvas.height / data.length;
    data.forEach((item, i) => {
      ctx.fillStyle = item.color;
      const x = uw * i;
      const y = uh * item.value;
      ctx.fillRect(x, height - y, uw, height);
    });
  }

  async tick() {
    this.render();
    await tick();
  }
}