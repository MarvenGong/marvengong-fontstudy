import React, { useState, useEffect } from 'react';
import { diffString, diff } from 'json-diff';
const jsondiffpatch = require('jsondiffpatch');
import MyDiff from './MyDiff';
import result from './data';
import { deepCopy } from '@src/utils';
import './style.less';
interface IJsonDiffProps {
  name: string;
}
const JsonDiff = (props: IJsonDiffProps) => {
  const { name } = props;
  const [data, setData] = useState<any>();
  const getPathById = function(id, catalog) {
    // 定义变量保存当前结果路径
    const temppath = [];
    const getNodePath = (node) => {
      temppath.push(node.id);
      // 找到符合条件的节点，通过throw终止掉递归
      if (node.id === id) {
        return temppath;
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        // temppath.pop();
      } else {
        // 找到叶子节点时，删除路径当中的该叶子节点
        temppath.pop();
      }
      return temppath;
    };
    return getNodePath(catalog);
  };
  useEffect(() => {

    console.log(diff(result.data.old_nodes, result.data.new_nodes));
    console.log(jsondiffpatch.create({}).diff(result.data.old_nodes, result.data.new_nodes));
    const obj1 = deepCopy(true, {}, result.data.old_nodes);
    const obj2 = deepCopy(true, {}, result.data.new_nodes);
    MyDiff.Getdifferent(obj1, obj2);
    console.log(obj1, obj2);

    const data = {
      id: 'a',
      children: [
        {
          id: 'b',
          children: [
            {
              id: 'c'
            }
          ]
        }
      ]
    }
    console.error(getPathById('b', data));
    return () => {
      // todo something when componentWillUnmount
    };

  }, []);
  return (
    <div className="json-diff-wraper">
      aaaaa
    </div>
  );
};
export default JsonDiff;
