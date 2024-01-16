import React, { useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import logo from './logo192.png';
import './App.css';

function App() {
  useEffect(() => {
    const canvas: HTMLCanvasElement = document.querySelector('#canvas') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx?.moveTo(0, 0);
    ctx?.rect(0, 0, 100, 100);
    ctx.fillStyle = '#f33';
    ctx?.fill();
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      ctx.drawImage(img, 100, 100, 100, 100);
    }
  }, []);
  const handleSave = () => {
    const canvas: HTMLCanvasElement = document.querySelector('#canvas') as HTMLCanvasElement;
    canvas.toBlob((blob: any) => {
      saveAs(blob, 'file.png');
    });
  }
  return (
    <div className="App">
      <canvas id='canvas' height="500"></canvas>
      <button id="btn-save" onClick={() => handleSave()}>下载到本地</button>
    </div>
  );
}

export default App;
