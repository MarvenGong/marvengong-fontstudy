const dataSource = require('./data');
function deepWrapFile(fileAry) {
  const ary = [];
  fileAry.map((obj) =>  {
    // 先去掉前面和后面的斜杠，再根据斜杠把文件路径转换成路径数组 如 /a/b.js => [a, b.js]
    const splitpath = obj.name.replace(/^\/|\/$/g, '').split('/');
    let ptr = ary;
    for (let i = 0; i < splitpath.length; i++) {
      const node = {
        name: splitpath[i],
        path: splitpath,
        text: splitpath[i], // jstree需要的属性
        state: obj.state, // jstree需要的属性
        type: obj.type,
      };
      if (obj.type === 'blob') {
        node.icon = 'jstree-file';
      }
      const Index = ptr.findIndex(item => item.name === splitpath[i]);
      if (Index === -1) {
        ptr.push({
          ...node, children: []
        });
        // ptr[ptr.length - 1].children = [];
      }
      const index = Index > -1 ? Index : ptr.length - 1;
      ptr = ptr[index].children;
    }
    console.info('完成一次文件处理');
    console.info(ptr);
    return ptr;
  });
  return ary;
}
deepWrapFile(dataSource);