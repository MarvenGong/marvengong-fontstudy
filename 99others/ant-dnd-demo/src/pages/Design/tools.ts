import { IPosition } from '@/types/global-types';

/**
 * 根据元素的起始位置和最终位置，计算相对于某元素的位置
 * @param initialPosition 拖动元素相对于屏幕左上角的起始位置（偏移量）
 * @param finalPosition 拖放完成后当前节点相对于屏幕左上角的位置
 * @param containerEle 目标容器元素
 * @returns
 */
export const getCorrectDroppedOffsetValue = (
  initialPosition: any,
  finalPosition: any,
  containerEle: HTMLDivElement,
): IPosition => {
  // 获取容器的位置信息 rect 信息包含left top width height
  const dropTargetPosition = containerEle.getBoundingClientRect();

  const { y: finalY, x: finalX } = finalPosition;
  const { y: initialY, x: initialX } = initialPosition;

  // 计算当前位置相对于drop容器的位置.
  // finalY > initialY, 则视为向下拖拽, 否则是向上拖拽
  const newYposition =
    finalY > initialY
      ? initialY + (finalY - initialY) - dropTargetPosition.top
      : initialY - (initialY - finalY) - dropTargetPosition.top;

  const newXposition =
    finalX > initialX
      ? initialX + (finalX - initialX) - dropTargetPosition.left
      : initialX - (initialX - finalX) - dropTargetPosition.left;

  return {
    left: newXposition,
    top: newYposition,
  };
};
