import Base from './base';

export default class BubbleSorter extends Base {
  async sort() {
    const { data } = this;
    for (let i = 0; i < data.length; i += 1) {
      for (let j = 0; j < data.length - 1 - i; j += 1) {
        await this.activate(j, j + 1);
        if (data[j].value > data[j + 1].value) await this.swap(j, j + 1);
      }
    }
    await this.finish();
  }
}
