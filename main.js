function random(max) {
  return ~~(Math.random() * max);
}
function initArray(size) {
  const numbers = [];
  for (let i = 0; i < size; i ++) numbers.push(i + 1);
  const arr = [];
  while (numbers.length) {
    arr.push({
      value: numbers.splice(random(numbers.length), 1)[0],
      color: `rgb(${random(256)},${random(256)},${random(256)})`,
    });
  }
  return arr;
}
function appendCanvas(text) {
  const div = document.createElement('div');
  const label = document.createElement('h4');
  label.textContent = text;
  div.appendChild(label);
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  div.appendChild(canvas);
  document.body.appendChild(div);
  return canvas;
}
async function waitForFrames(num) {
  await new Promise(resolve => {
    function check() {
      if (!--num || num < 0) resolve();
      else checkLater();
    }
    function checkLater() {
      requestAnimationFrame(check);
    }
    checkLater();
  });
}
async function nextTick(canvas, arr) {
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const uw = CANVAS_WIDTH / arr.length;
    const uh = CANVAS_HEIGHT / MAX_HEIGHT;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    arr.forEach((item, i) => {
      ctx.fillStyle = item.color;
      const x = uw * i;
      const y = uh * item.value;
      ctx.fillRect(uw * i, CANVAS_HEIGHT - y, uw, CANVAS_HEIGHT);
    });
  }
  await waitForFrames(TICK_FRAMES);
}

function startSort(text, arr, sort) {
  const canvas = appendCanvas(text);
  nextTick(canvas, arr);
  sort(canvas, arr.slice());
}

async function bubbleSort(canvas, arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i].value > arr[j].value) {
        const x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
      }
      await nextTick(canvas, arr);
    }
  }
}
async function insertionSort(canvas, arr) {
  for (let i = 1; i < arr.length; i++) {
    const x = arr[i];
    let j;
    for (j = i; j--;) {
      if (x.value < arr[j].value) {
        arr[j + 1] = arr[j];
        arr[j] = x;
        await nextTick(canvas, arr);
      } else {
        break;
      }
    }
    arr[j + 1] = x;
    await nextTick(canvas, arr);
  }
}
async function selectionSort(canvas, arr) {
  for (let i = 0; i < arr.length; i++) {
    let k = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[k].value > arr[j].value) {
        k = j;
      }
      await nextTick();
    }
    if (k !== i) {
      const x = arr[i];
      arr[i] = arr[k];
      arr[k] = x;
    }
    await nextTick(canvas, arr);
  }
}
async function quickSort(canvas, arr) {
  const stack = [{start: 0, end: arr.length}];
  let item;
  while (item = stack.pop()) {
    let head = item.start;
    let tail = item.end - 1;
    const i = item.start + random(item.end - item.start);
    const x = arr[i];
    if (head !== i) {
      arr[i] = arr[head];
      arr[head] = x;
      await nextTick(canvas, arr);
    }
    while (head < tail) {
      while (head < tail && arr[tail].value >= x.value) {
        tail--;
        await nextTick();
      }
      if (head === tail) break;
      arr[head++] = arr[tail];
      arr[tail] = x;
      await nextTick(canvas, arr);
      while (head < tail && arr[head].value < x.value) {
        head++;
        await nextTick();
      }
      if (head === tail) break;
      arr[tail--] = arr[head];
      arr[head] = x;
      await nextTick(canvas, arr);
    }
    arr[head] = x;
    await nextTick(canvas, arr);
    if (item.start + 1 < head) stack.push({start: item.start, end: head});
    if (head + 2 < item.end) stack.push({start: head + 1, end: item.end});
  }
}

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 100;
const MAX_HEIGHT = 100;
const TICK_FRAMES = 1;
const arr = initArray(80);

startSort('Quick sort', arr, quickSort);
startSort('Bubble sort', arr, bubbleSort);
startSort('Insertion sort', arr, insertionSort);
startSort('Selection sort', arr, selectionSort);
