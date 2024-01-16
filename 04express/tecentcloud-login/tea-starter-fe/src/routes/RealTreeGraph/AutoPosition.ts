import nonLayeredTidyTree from './layout';
// 平铺数组

export function TreeToArray(tree) {
  const arr = [];
  const expanded = (datas) => {
    if (datas && datas.length > 0) {
      datas.forEach((e) => {
        arr.push(e);
        expanded(e.children);
      });
    }
  };
  expanded(tree);
  return arr;
}
export function AutoPosition(
  root: any[],
  options: any
) {
  const isHorizontal = false;
  // 展开数组
  const treeArrayResult: any[] = TreeToArray(root);
  // 树图需要指定大小
  treeArrayResult.forEach((item) => {
    const ele = document.getElementById(item.id);
    if (ele) {
      item.realSize = [ele.offsetWidth, ele.offsetHeight];
      item.size = [
        ele.offsetWidth + options.xOffset / 2,
        ele.offsetHeight + options.yOffset / 2,
      ];
    } else {
      item.size = [0, 0];
    }
  });

  root.forEach((el) => {
    nonLayeredTidyTree(el, isHorizontal);
  });
  return root;
}