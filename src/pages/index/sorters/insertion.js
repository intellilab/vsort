import Base from './base';

export default class InsertionSorter extends Base {
  async sort() {
    const { data } = this;
    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];
      let j;
      let k;
      for (j = i - 1; j >= 0; j -= 1) {
        await this.activate(i, j);
        if (item.value < data[j].value) {
          k = j;
        } else {
          break;
        }
      }
      for (j = i; j > k; j -= 1) {
        await this.swap(j, j - 1);
      }
    }
    await this.finish();
  }
}
