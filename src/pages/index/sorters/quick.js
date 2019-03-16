import Base from './base';
import { rand } from '../util';

export default class QuickSorter extends Base {
  async sort() {
    const { arrays: [array] } = this;
    const stack = [{ head: 0, tail: array.length - 1 }];
    let index;
    // eslint-disable-next-line no-cond-assign
    while (index = stack.pop()) {
      const { head, tail } = index;
      const rnd = rand(tail + 1, head);
      if (head !== rnd) {
        await this.swap(head, rnd, head, tail);
      }
      let start = head;
      let end = tail;
      while (start < end) {
        while (start < end) {
          this.activate([head, tail], { block: true });
          this.activate([start, end], { clear: false });
          await this.commit();
          if (array[end].value < array[start].value) break;
          end -= 1;
        }
        if (start === end) break;
        await this.swap(start, end, head, tail);
        start += 1;
        while (start < end) {
          this.activate([head, tail], { block: true });
          this.activate([start, end], { clear: false });
          await this.commit();
          if (array[start].value > array[end].value) break;
          start += 1;
        }
        if (start === end) break;
        await this.swap(start, end, head, tail);
        end -= 1;
      }
      if (head < start - 1) {
        stack.push({ head, tail: start - 1 });
      }
      if (start + 1 < tail) {
        stack.push({ head: start + 1, tail });
      }
    }
    this.finish();
  }

  async swap(i, j, head, tail, index = 0) {
    this.activate([head, tail], { block: true });
    this.activate([i, j], { clear: false });
    const array = this.arrays[index];
    this.set({
      [i]: array[j],
      [j]: array[i],
    }, index);
    await this.commit();
  }
}
