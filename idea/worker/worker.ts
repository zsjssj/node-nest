//worker_threads 只支持nodejs环境
import { parentPort } from 'worker_threads';

function isPrime(num: number): boolean {
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}
function findPrimes(limit: number): Array<number> {
  const primes: Array<number> = [];
  for (let num = 2; num <= limit; num++) {
    if (isPrime(num)) primes.push(num);
  }
  return primes;
}

parentPort!.on('message', function (event) {
  const input = event.data;
  const result = findPrimes(input);
  parentPort!.postMessage(result); // 将结果发送回主线程
});
console.log(new Date().getTime(), 'worker start');
