(function () {
  console.time('递归');
  function fb1(n: number): number {
    if (n <= 1) {
      return n;
    }
    return fb1(n - 1) + fb1(n - 2);
  }
  const a1 = fb1(6);
  console.log(`a1`, a1);
  console.timeEnd('递归');

  console.time('数组动态规划');
  function fb2(n: number) {
    const arr: number[] = [0, 1];
    for (let i = 2; i <= n; i++) {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[6];
  }
  const a2 = fb2(6);
  console.log(`a2`, a2);
  console.timeEnd('数组动态规划');
})();
