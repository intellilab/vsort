import Base from './base';

export default class InsertionSorter extends Base {
  async sort() {
    const { arrays: [array] } = this;
    for (let i = 0; i < array.length; i += 1) {
      const item = array[i];
      let j;
      let k = i;
      for (j = i - 1; j >= 0; j -= 1) {
        if (item.value >= array[j].value) break;
        k = j;
      }
      for (j = i; j > k; j -= 1) {
        this.activate([0, i], { block: true });
        this.activate([j, j - 1], { clear: false });
        this.set({
          [j]: array[j - 1],
          [j - 1]: array[j],
        });
        await this.commit();
      }
    }
    this.finish();
  }
}
