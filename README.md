# 🧵 Web Worker Performance Demo

This project demonstrates the difference between running heavy computations on the **main JavaScript thread** and in a **Web Worker**.  

It highlights how Web Workers keep the UI responsive while handling CPU-intensive tasks like prime number calculation.

---

## 🚀 Features
- Run prime number calculations **on the main thread** (UI blocks, FPS drops).  
- Run the same calculation **in a Web Worker** (UI stays smooth).  
- **Progress bar** showing computation progress.  
- **FPS counter** to visualize UI responsiveness.  
- Execution time comparison.  

---

## 📊 Observations

I tested the project with two different workloads:  

### Case 1: 600,000 Iterations
- **Main Thread**: Slight lag, UI feels somewhat sluggish but still usable.  
- **Web Worker**: Took a bit longer due to **overhead of message passing**, but UI stayed fully smooth.  

✅ **Takeaway**: For smaller workloads, Web Worker overhead can make it slower, so running on the main thread might be fine.  

---

### Case 2: 60,000,000 Iterations
- **Main Thread**: UI completely froze. No FPS updates, no responsiveness until the task finished.  
- **Web Worker**: UI remained smooth, FPS counter updated, progress bar moved as expected.  

✅ **Takeaway**: For heavy computations, Web Workers are **essential** to keep the UI responsive.  

---

## 🖼️ Demo Results

| Workload      | Main Thread (UI)                   | Web Worker (UI)                |
|---------------|------------------------------------|--------------------------------|
| **600,000**   | Slight lag, but faster execution   | Smooth UI, but slightly slower |
| **60,000,000**| Completely blocked, frozen UI      | Smooth UI, responsive updates  |

---

### 600,000 Iterations
**Main Thread**
![600k Main Thread](/images/600k-main.png)

**Web Worker**
![600k Web Worker](/images/600k-worker.png)

---

### 60,000,000 Iterations
**Main Thread**
![60M Main Thread](/images/60M-main.png)

**Web Worker**
![60M Web Worker](/images/60M-worker.png)

