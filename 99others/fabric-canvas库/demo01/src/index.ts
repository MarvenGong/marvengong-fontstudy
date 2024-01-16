import {fabric} from 'fabric';
import { extendLineArrow } from './fabric-extends';
(function() {
  extendLineArrow();
  const canvas = new fabric.Canvas('graph', {
    selectionColor: 'transparent'
  });
  canvas.isDrawingMode = false;
  canvas.freeDrawingBrush.width = 2;
  canvas.freeDrawingBrush.strokeLineCap = 'radius';
  canvas.setBackgroundColor('#f5f5f5', function(){});
  canvas.setCursor('crosshair')
  let startDrawingPosition = {
    left: 0,
    top: 0,
  }
  let isDrawing = false;
  let addObj: any = null;
  canvas.on('mouse:down', function(e) {
    if (e.target) return false; // 如果是在现有的实体上点击，不做任何操作
    isDrawing = true;
    startDrawingPosition = {
      left: e.pointer.x,
      top: e.pointer.y,
    }
  });
  canvas.on('mouse:move', function(e) {
    if (!isDrawing || canvas.isDrawingMode) return false;
    const endposition = {
      left: e.pointer.x,
      top: e.pointer.y
    }
    if (!addObj) {
      // addObj = new fabric.Rect({
      //   top : Math.min(startDrawingPosition.top, endposition.top),
      //   left : Math.min(startDrawingPosition.left, endposition.left),
      //   width : Math.abs(startDrawingPosition.left - endposition.left),
      //   height : Math.abs(startDrawingPosition.top - endposition.top),
      //   fill: 'transparent',
      //   stroke: 'orange',
      //   strokeWidth: 4
      // });
      addObj = new (fabric as any).LineArrow([
        startDrawingPosition.left,
        startDrawingPosition.top,
        endposition.left,
        endposition.top],
      {
        fill: 'transparent',
        stroke: '#f33',
        strokeWidth: 4
      });
      canvas.add(addObj);
    } else {
      addObj.set({
        y1 : startDrawingPosition.top,
        x1 : startDrawingPosition.left,
        x2 : endposition.left,
        y2 : endposition.top,
      });
      canvas.renderAll();
    }
  });
  canvas.on('mouse:up', function() {
    isDrawing = false;
    addObj = null;
  })
  document.querySelector('#btn-start-free').addEventListener('click', function() {
    canvas.isDrawingMode = true
  })
  document.querySelector('#btn-stop-free').addEventListener('click', function() {
    canvas.isDrawingMode = false
  })
})()
