// Performance monitoring utility for development
// Add this to your main.jsx to monitor FPS in development

export class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.frames = 0;
    this.lastTime = performance.now();
    this.fpsElement = null;
    
    if (import.meta.env.DEV) {
      this.init();
    }
  }

  init() {
    // Create FPS counter element
    this.fpsElement = document.createElement('div');
    this.fpsElement.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      padding: 10px 15px;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      z-index: 99999;
      pointer-events: none;
      backdrop-filter: blur(10px);
    `;
    document.body.appendChild(this.fpsElement);
    
    this.measure();
  }

  measure = () => {
    this.frames++;
    const currentTime = performance.now();
    
    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
      this.frames = 0;
      this.lastTime = currentTime;
      
      if (this.fpsElement) {
        const color = this.fps >= 55 ? '#00ff00' : this.fps >= 30 ? '#ffaa00' : '#ff0000';
        const status = this.fps >= 55 ? '🏆 SMOOTH' : this.fps >= 30 ? '⚠️ OK' : '🐌 LAGGY';
        this.fpsElement.innerHTML = `
          <div style="color: ${color}; font-weight: bold;">
            ${this.fps} FPS ${status}
          </div>
        `;
      }
    }
    
    requestAnimationFrame(this.measure);
  }

  destroy() {
    if (this.fpsElement) {
      document.body.removeChild(this.fpsElement);
    }
  }
}

// Usage in main.jsx:
// import { PerformanceMonitor } from './utils/performanceMonitor';
// const monitor = new PerformanceMonitor();

export default PerformanceMonitor;
