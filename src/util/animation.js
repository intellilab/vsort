const callbacks = [];
animate();

function animate() {
  requestAnimationFrame(animate);
  callbacks.forEach(callback => { callback(); });
}

export function register(callback) {
  callbacks.push(callback);
  return () => {
    const i = callbacks.indexOf(callback);
    if (i >= 0) callbacks.splice(i, 1);
  };
}

export function tick(n = 1) {
  return new Promise(resolve => {
    let f = 0;
    const revoke = register(() => {
      f += 1;
      if (f >= n) {
        revoke();
        resolve();
      }
    });
  });
}
