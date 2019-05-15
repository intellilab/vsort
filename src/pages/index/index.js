import React from '@gera2ld/jsx-dom';
import { sequence, shuffle } from './util';
import {
  setSpeed,
  BubbleSorter,
  SelectionSorter,
  InsertionSorter,
  QuickSorter,
  MergeSorter,
} from './sorters';
import styles from './style.module.css';

const input = (
  <input
    type="range"
    min="1"
    max="10"
    onChange={e => setSpeed(e.target.value)}
  />
);
setSpeed(input.value = 10);
const container = <div className={styles.container} />;
document.body.append(
  <a href="https://github.com/intellilab/vsort">
    <img
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        border: 0,
      }}
      src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67"
      alt="Fork me on GitHub"
      data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"
    />
  </a>,
  <div className={styles.p}>Speed: {input}</div>,
  container,
);
const array = shuffle(sequence(60));
visualizeSort('Bubble sort', BubbleSorter);
visualizeSort('Selection sort', SelectionSorter);
visualizeSort('Insertion sort', InsertionSorter);
visualizeSort('Merge sort', MergeSorter);
visualizeSort('Quick sort', QuickSorter);

function visualizeSort(title, Sorter) {
  const sorter = new Sorter(array);
  container.appendChild((
    <div>
      <h4 className={styles.p}>{title}</h4>
      {sorter.canvases.map(canvas => <div>{canvas}</div>)}
    </div>
  ));
  sorter.sort();
}
