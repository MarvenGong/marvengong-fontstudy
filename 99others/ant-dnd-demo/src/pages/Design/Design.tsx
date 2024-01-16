import { DndProvider, DropTargetMonitor, useDrop } from 'react-dnd';
import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import  './style.less';
import { getCorrectDroppedOffsetValue } from './tools';
import LeftItem from '../LeftItem/LeftItem';
import RightItem from '../RightItem/RightItem';

const Design = function() {
  const [addedTableCharts, setAddedTableCharts] = useState<any[]>([]);
  const leftImgs = [{
    src: 'https://tes-public-1302008357.cos.ap-guangzhou.myqcloud.com/static/sites/images/home/bg_cyan.png',
  },{
    src: 'https://tes-public-1302008357.cos.ap-guangzhou.myqcloud.com/static/sites/images/home/bg_green.png',
  }]

  // 第一个参数是 collect 方法返回的对象，第二个参数是一个 ref 值，赋值给 drop 元素
  const [collectProps, droper] = useDrop({
    // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
    accept: ['Box', 'poolItem'],
    // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
    drop(target: any, monitor: DropTargetMonitor) {
      console.log(target, monitor.getInitialSourceClientOffset());
      const position = getCorrectDroppedOffsetValue(
        monitor.getInitialSourceClientOffset(), // 拖动元素相对于屏幕左上角的起始位置（偏移量）
        monitor.getSourceClientOffset(), // 拖放完成后当前节点相对于屏幕左上角的位置
        document.querySelector('#container') as HTMLDivElement,
      );
      // console.log(position);
      // 添加新元素
      if (target.source === 'graph') {
        addedTableCharts[target.index].position = position;
      } else {
        // console.info('新元素拓建来', GraphItemInitProperties[target.data.type]);
        addedTableCharts.push({
          name: target.name,
          position: position,
          type: target.type,
          properties: {
            src: target.src
          }
        });
      }
      setAddedTableCharts([...addedTableCharts]);
    },
  });
  return (
      <div>
        <h1 className="title">
          ant-dnd
        </h1>
        <div className="main">
          <div className="left">
            {leftImgs.map((item, idx) => {
              return <LeftItem key={idx} src={item.src} />
            })}
          </div>
          <div className="container" id="container" ref={droper}>
            {addedTableCharts?.map?.((item: any, idx) => {
            const { name, type } = item;
            const props: any = {
              key: idx,
              name: item.name,
              position: item.position,
              style: {
                position: 'absolute',
              },
              properties: item.properties,
              data: { ...item, source: 'graph', index: idx },
            };
            return (
              <>
                <RightItem position={item.position} key={idx} index={idx} src={item.properties.src} />
              </>
            );
          })}
          </div>
        </div>
      </div>
  );
}
export default Design;
