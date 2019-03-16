import h from '@gera2ld/jsx-dom';
import { tick } from '../util';

const COLOR_UNSORTED = '#e0e4cc';
const COLOR_ACTIVE_BLOCK = '#e0e4ff';
const COLOR_ACTIVE_ITEM = '#8870ff';
const COLOR_SORTED = '#64ddbb';

let frames = 1;

export function setSpeed(value) {
  frames = Math.min(10, Math.max(1, 11 - value)) || 1;
}

export default class BaseSorter {
  constructor(data) {
    this.initializeArray(data);
    this.initializeCanvas();
  }

  initializeArray(data) {
    this.arrays = [data.map(value => ({
      value,
      active: false,
    }))];
  }

  initializeCanvas() {
    this.canvases = this.arrays.map(() => this.getCanvas());
  }

  getCanvas() {
    return <canvas width={640} height={100} />;
  }

  async commit() {
    this.canvases.forEach((_, index) => {
      this.render(index);
    });
    await tick(frames);
  }

  activate(itemIndices, options = {}, index = 0) {
    const {
      clear = true,
      block = false,
    } = options;
    const array = this.arrays[index];
    if (clear) {
      array.forEach((item) => {
        item.color = COLOR_UNSORTED;
      });
    }
    if (block) {
      const [start, end] = itemIndices;
      for (let i = start; i <= end; i += 1) {
        const item = array[i];
        item.color = COLOR_ACTIVE_BLOCK;
      }
    } else {
      itemIndices.forEach((i) => {
        const item = array[i];
        if (item) item.color = COLOR_ACTIVE_ITEM;
      });
    }
  }

  set(values, index = 0) {
    const array = this.arrays[index];
    Object.entries(values)
    .forEach(([i, value]) => {
      array[i] = value;
    });
  }

  finish() {
    this.arrays.forEach((array) => {
      array.forEach((item) => {
        item.color = COLOR_SORTED;
      });
    });
    this.commit();
  }

  render(index = 0) {
    const array = this.arrays[index];
    const canvas = this.canvases[index];
    const { width, height } = canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    const uw = canvas.width / array.length;
    const uh = canvas.height / array.length;
    array.forEach((item, i) => {
      ctx.fillStyle = item.color;
      const x = uw * i;
      const y = uh * item.value;
      ctx.fillRect(x, height - y, uw, height);
    });
  }
}
