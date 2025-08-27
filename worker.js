function isPrime(num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

onmessage = function (e) {
  const limit = e.data;
  let primes = [];

  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primes.push(i);

    if (i % 1000 === 0) {
      const progress = Math.floor((i / limit) * 100);
      postMessage({ type: "progress", value: progress });
    }
  }

  postMessage({ type: "done", result: primes });
};
