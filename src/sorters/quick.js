import Base from './base';
import { rand } from '../utils';

export default class QuickSorter extends Base {
  async sort() {
    const { data } = this;
    const stack = [{ head: 0, tail: data.length - 1 }];
    let index;
    // eslint-disable-next-line no-cond-assign
    while (index = stack.pop()) {
      let { head, tail } = index;
      const rnd = rand(tail + 1, head);
      if (head !== rnd) {
        await this.swap(head, rnd);
      }
      while (head < tail) {
        while (head < tail) {
          await this.activate(head, tail);
          if (data[tail].value < data[head].value) break;
          tail--;
        }
        if (head === tail) break;
        await this.swap(head, tail);
        head++;
        while (head < tail) {
          await this.activate(head, tail);
          if (data[head].value > data[tail].value) break;
          head++;
        }
        if (head === tail) break;
        await this.swap(head, tail);
        tail--;
      }
      if (index.head + 1 < head) {
        stack.push({ head: index.head, tail: head - 1 });
      }
      if (head + 1 < index.tail) {
        stack.push({ head: head + 1, tail: index.tail });
      }
    }
    await this.finish();
  }
}
