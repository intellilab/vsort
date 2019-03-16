import Base from './base';

const EMPTY = { value: 0 };

export default class MergeSorter extends Base {
  initializeArray(data) {
    super.initializeArray(data);
    this.arrays.push(Array.from(this.arrays[0], () => EMPTY));
  }

  async sort() {
    const { arrays } = this;
    const { length } = arrays[0];
    let unit = 1;
    let active = 0;
    while (length > unit) {
      const twiceUnit = 2 * unit;
      for (let i = 0; i < length; i += twiceUnit) {
        const start1 = i;
        const start2 = i + unit;
        const end1 = start2 - 1;
        const end2 = Math.min(start2 + unit, length) - 1;
        let offset = start1;
        let index1 = start1;
        let index2 = start2;
        while (index1 <= end1 || index2 <= end2) {
          this.activate([start1, end2], { block: true }, active);
          this.activate([start1, offset], { block: true }, 1 - active);
          this.activate([
            index1 <= end1 ? index1 : -1,
            index2 <= end2 ? index2 : -1,
          ], { clear: false }, active);
          const array = this.arrays[active];
          let index;
          if (index1 <= end1 && index2 <= end2) {
            if (array[index1].value < array[index2].value) {
              index = index1;
              index1 += 1;
            } else {
              index = index2;
              index2 += 1;
            }
          } else if (index1 <= end1) {
            index = index1;
            index1 += 1;
          } else {
            index = index2;
            index2 += 1;
          }
          this.set({
            [offset]: array[index],
          }, 1 - active);
          this.set({
            [index]: EMPTY,
          }, active);
          offset += 1;
          await this.commit();
        }
      }
      active = 1 - active;
      unit *= 2;
    }
    this.finish();
  }
}
