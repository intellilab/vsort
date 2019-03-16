import Base from './base';

export default class BubbleSorter extends Base {
  async sort() {
    const { arrays: [array] } = this;
    for (let i = 0; i < array.length; i += 1) {
      const end = array.length - 1 - i;
      for (let j = 0; j < end; j += 1) {
        this.activate([0, end], { block: true });
        this.activate([j, j + 1], { clear: false });
        if (array[j].value > array[j + 1].value) {
          this.set({
            [j]: array[j + 1],
            [j + 1]: array[j],
          });
        }
        await this.commit();
      }
    }
    this.finish();
  }
}
