const statusEl = document.getElementById("status");
const timeEl = document.getElementById("time");
const mainBtn = document.getElementById("mainThreadBtn");
const workerBtn = document.getElementById("workerBtn");
const progressFill = document.getElementById("progressFill");

let worker;

function isPrime(num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

// MAIN THREAD EXECUTION
mainBtn.addEventListener("click", () => {
  const limit = document.getElementById("limit").value;
  statusEl.textContent = "Running on main thread...";
  timeEl.textContent = "";
  progressFill.style.width = "0%";

  const start = performance.now();

  let primes = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primes.push(i);

    // update progress occasionally
    if (i % 1000 === 0) {
      const progress = Math.floor((i / limit) * 100);
      progressFill.style.width = progress + "%";
    }
  }

  const end = performance.now();
  statusEl.textContent = "Main thread: Done ✅";
  timeEl.textContent = `Execution time: ${(end - start).toFixed(2)} ms`;
  progressFill.style.width = "100%";
});

// WEB WORKER EXECUTION
workerBtn.addEventListener("click", () => {
  const limit = document.getElementById("limit").value;

  if (worker) {
    worker.terminate();
  }

  worker = new Worker("worker.js");

  statusEl.textContent = "Running in Web Worker...";
  timeEl.textContent = "";
  progressFill.style.width = "0%";

  const start = performance.now();

  worker.postMessage(limit);

  worker.onmessage = (e) => {
    if (e.data.type === "progress") {
      progressFill.style.width = e.data.value + "%";
    } else if (e.data.type === "done") {
      const end = performance.now();
      statusEl.textContent = "Web Worker: Done ✅";
      timeEl.textContent = `Execution time: ${(end - start).toFixed(2)} ms`;
      progressFill.style.width = "100%";
    }
  };
});
