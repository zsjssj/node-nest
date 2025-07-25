// 批量执行大量任务不卡顿的解决方案。主要是判断距离下一次渲染是否还有时间，利用requestIdleCallback的特性，没有时间就不执行任务，有时间就执行任务。
export function asyncLoop<T>(tasks: (() => Promise<T>)[], onComplete: (results: T[]) => void, batchSize = 10): void {
  const results: T[] = [];
  let currentIndex = 0;
  function processBatch() {
    if (currentIndex >= tasks.length) {
      onComplete(results);
      return;
    }
    const endIndex = Math.min(currentIndex + batchSize, tasks.length);
    const batch = tasks.slice(currentIndex, endIndex);
    Promise.all(batch.map((task) => task()))
      .then((res) => {
        results.push(...res);
        currentIndex += batchSize;
        requestIdleCallback(processBatch);
      })
      .catch((error) => {
        console.error('Error processing batch:', error);
        onComplete(results); // Call onComplete even if there's an error
      });
  }
  requestIdleCallback(processBatch);
}
