import React, { useRef, useEffect } from 'react';
import Mock from 'mockjs';
import { makeSVG } from './Tools';
import './style.less';
const SimpleGraph = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const idStart = 100;
  const data = Mock.mock({
    'list|6': [{
      'id|+1': idStart,
      'name': '@cname',
      'pid': function() {
        return this.id === idStart ? 'root' : this.id - 1;
      }
    }]
  });
  // 1、布局算法算出节点的布局信息
  const distance = 50;
  const hLineLayout = (nodes) => {
    return nodes.map((item) => {
      if (item.pid === 'root') {
        item.x = 0;
        item.y = 0;
      } else {
        const p = nodes.find(n => {
          return n.id === item.pid;
        });
        item.x = p.x + 200 + distance;
        item.y = 0;
      }
      return item;
    });
  };
  const nodes = hLineLayout(data.list);
  // 2、连线信息
  const drawLine = (nodes, container: HTMLDivElement) => {
    const svgs = document.querySelectorAll('.draw-map svg');
    for(var i = 0; i < svgs.length; i++) { 
      container.removeChild(svgs[i]); 
    }
    nodes.map(item => {
      if (item.pid !== 'root') {
        const p = nodes.find(n => {
          return n.id === item.pid;
        });
        // 这里注意一定要用这个方法创建svg
        let svg= makeSVG('svg', {
          width: ''+distance, height: '1',
          style: `position:absolute;left: ${p.x+200}px; top: 50px; width:${distance}px;height:1px`
        });
        const line = makeSVG('line', {
          x1: '0', x2: ''+distance, y1: '0', y2: '0'
        });
        line.setAttribute('stroke', 'red');
        line.setAttribute('stroke-width', '4');
        svg.appendChild(line);
        container.appendChild(svg);
      }
    });
  };
  useEffect(() => {
    drawLine(nodes, containerRef.current);
  }, []);
  return (
    <div className="simple-graph-wraper" style={{position: 'relative'}}>
      <div className="draw-map" style={{height: '200px'}} ref={containerRef}>
        {nodes.map((item) => {
          return <div className="people-item"
            style={{left: item.x, top: item.y}} key={item.id}>{item.name}</div>
        })}
      </div>
    </div>
  );
};
export default SimpleGraph;
