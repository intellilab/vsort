import Base from './base';

export default class SelectionSorter extends Base {
  async sort() {
    const { arrays: [array] } = this;
    for (let i = 0; i < array.length; i += 1) {
      let k = i;
      for (let j = i + 1; j < array.length; j += 1) {
        this.activate([i, array.length - 1], { block: true });
        this.activate([j, k], { clear: false });
        await this.commit();
        if (array[k].value > array[j].value) k = j;
      }
      if (k !== i) {
        this.activate([i, array.length - 1], { block: true });
        this.activate([i, k], { clear: false });
        this.set({
          [i]: array[k],
          [k]: array[i],
        });
      }
      await this.commit();
    }
    this.finish();
  }
}
