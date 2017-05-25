import Base from './base';

export default class SelectionSorter extends Base {
  async sort() {
    const { data } = this;
    for (let i = 0; i < data.length; i++) {
      let k = i;
      for (let j = i + 1; j < data.length; j++) {
        await this.activate(j, k);
        if (data[k].value > data[j].value) {
          k = j;
        }
      }
      if (k !== i) {
        await this.swap(i, k);
      }
    }
    await this.finish();
  }
}
