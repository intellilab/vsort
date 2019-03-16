export * from './animation';

export function rand(end, start = 0) {
  return Math.floor(start + Math.random() * (end - start));
}

export function sequence(length) {
  return Array.from({ length }, (v, i) => i);
}

/**
 * Fisher–Yates shuffle
 */
export function shuffle(list) {
  const result = [...list];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const randomIndex = rand(i + 1);
    const itemAtIndex = result[randomIndex];

    result[randomIndex] = result[i];
    result[i] = itemAtIndex;
  }

  return result;
}
