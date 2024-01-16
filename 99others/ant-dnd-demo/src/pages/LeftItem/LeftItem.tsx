import React, { useState, useEffect, FC } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import './style.less';
interface ILeftItemProps {
  src?: string;
}
const LeftItem: FC<ILeftItemProps> = (props: ILeftItemProps) => {
  const { src } = props;
  const [collected, poolItemRef, dragPreview] = useDrag({
    type: 'poolItem',
    item: {
      src,
    },
    // end: (item: any, monitor: DragSourceMonitor) => onStop?.(item, monitor),
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });
  return (
    <>
    <DragPreviewImage connect={dragPreview} src={src || ''} />
    <div ref={poolItemRef} style={{
      width: 50,
      height: 50
    }} data-v-1vgpf0ta className="left-item-wraper">
      <img src={src} width="50" height="50" alt="" />
    </div>
    </>
  );
};
export default LeftItem;
