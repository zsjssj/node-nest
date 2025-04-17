(function () {
  function toSetColor() {
    const color = Math.random().toString(16).slice(2, 8);
    return '#' + color;
  }
  let color = toSetColor();
  console.log('color: ', color);

  console.time('Map');
  let map1 = new Map();
  for (let i = 0; i < 100; i++) {
    map1.set(`${i}`, toSetColor());
    let a = map1.get(`${i}`);
  }
  console.timeEnd('Map');

  console.time('Obj');
  let obj1 = {};
  for (let i = 0; i < 100; i++) {
    obj1[`${i}`] = toSetColor();
    let a = obj1[`${i}`];
  }
  console.timeEnd('Obj');
})();
