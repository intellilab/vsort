import { createElement, createCanvas, sequence, shuffled } from './utils';
import BubbleSorter from './sorters/bubble';
import SelectionSorter from './sorters/selection';
import InsertionSorter from './sorters/insertion';
import QuickSorter from './sorters/quick';

const array = shuffled(sequence(60));

function visualizeSort(title, Sorter) {
  const div = createElement('div');
  const label = createElement('h4', {
    textContent: title,
  });
  div.appendChild(label);
  const canvas = createCanvas();
  div.appendChild(canvas);
  document.body.appendChild(div);
  const sorter = new Sorter(canvas, array);
  sorter.sort();
}

visualizeSort('Bubble sort', BubbleSorter);
visualizeSort('Selection sort', SelectionSorter);
visualizeSort('Insertion sort', InsertionSorter);
visualizeSort('Quick sort', QuickSorter);
