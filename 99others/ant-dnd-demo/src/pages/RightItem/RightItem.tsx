import { IPosition } from '@/types/global-types';
import React, { useState, useEffect, FC } from 'react';
import { useDrag } from 'react-dnd';
import './style.less';
interface IRightItemProps {
  src?: string;
  index?: number;
  position?: IPosition;
}
const RightItem: FC<IRightItemProps> = (props: IRightItemProps) => {
  const { src, index } = props;
  const [collected, poolItemRef] = useDrag({
    type: 'Box',
    item: {
      src,
      index,
      source: 'graph'
    },
    // end: (item: any, monitor: DragSourceMonitor) => onStop?.(item, monitor),
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });
  return (
    <div ref={poolItemRef} style={{
      position: 'absolute',
      width: 300,
      height: 300,
      ...props.position
    }} data-v-1vgpf0ta className="left-item-wraper">
      <img src={src} width="300" height="300" alt="" />
    </div>
  );
};
export default RightItem;
