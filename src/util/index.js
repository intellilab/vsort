export * from './animation';

export function rand(end, start = 0) {
  return Math.floor(start + Math.random() * (end - start));
}

export function sequence(length) {
  return Array.from({ length }, (v, i) => i);
}

export function shuffled(arr) {
  const copy = arr.slice();
  const result = [];
  while (copy.length) {
    result.push(copy.splice(rand(copy.length), 1)[0]);
  }
  return result;
}
