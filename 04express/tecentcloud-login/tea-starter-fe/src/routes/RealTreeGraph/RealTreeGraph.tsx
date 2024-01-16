import React, { useState, useEffect } from 'react';
import { data } from './data';
import { AutoPosition } from './AutoPosition';
import {
  newInstance,
  BrowserJsPlumbInstance,
} from '@jsplumb/community';
import './style.less';
const sourceData = data;
let miniGraphInstance: BrowserJsPlumbInstance;
const ID_SUFFIX = 'mini-';
const RealTreeGraph = (props: any) => {
  const [nodes, setNodes] = useState([]);
  const [treeGraph, setTreeGraph] = useState([]);
  // 处理源数据，得到节点渲染列表和图形结构化数据
  const initWorkNodes = (sourceData: any[]) => {
    // console.log(sourceData);
    if (sourceData.length > 0) {
      const dataToNodes: any[] = [];
      const dataToTreeGraph: any[] = [];
      const deepWrapTree = (root) => {
        const wrapNode = {
          id: root.id,
          pid: root.pid,
          name: root.name,
          isLeaf: root.isLeaf, // 是否是叶子节点（没有子节点）
          backward: root.backward,
          x: 0,
          y: 0,
          children: root.children.map((child) => deepWrapTree(child)) || [],
          relations: root.relations,
          nodeList: root.nodeList || null,
        };
        dataToNodes.push(wrapNode);
        return wrapNode;
      };
      sourceData.forEach((nodeData) => {
        dataToTreeGraph.push(deepWrapTree(nodeData));
      });
      // 更新视图
      setNodes(dataToNodes);
      setTreeGraph(dataToTreeGraph);
    }
  };
  // 连线-根据树形结构的数据，递归连线。
  const deepConnect = (root) => {
    if (!miniGraphInstance) return false;
    setTimeout(() => {
      // 链接父子节点
      root.children.forEach((child) => {
        miniGraphInstance.connect(
          {
            source: `${root.id}`,
            target: `${child.id}`,
            anchors: ['BottomCenter', 'TopCenter'],
            connector: 'Flowchart',
          }
        );
        deepConnect(child);
      });
    }, 100);
  };
  // 实例化jsPlumb
  const initGraph = () => {
    if (miniGraphInstance) {
      // document.querySelector(`#${ID_SUFFIX}workspace-container`).innerHTML = '';
      document
        .querySelectorAll(
          `#${ID_SUFFIX}workspace-container .jtk-connector, #${ID_SUFFIX}workspace-container .jtk-endpoint`
        )
        .forEach((ele) => {
          ele.parentNode.removeChild(ele);
        });
      miniGraphInstance = null;
    }
    miniGraphInstance = newInstance({
      container: `container`,
      connectionsDetachable: false, // 禁止拖动断开
      reattachConnections: true,
    });
  };
  useEffect(() => {
    initWorkNodes(sourceData);
  }, []);
  useEffect(() => {
    if (treeGraph.length > 0) {
      // XXX:重新定位树状结构
      setTimeout(() => {
        const result = AutoPosition(treeGraph.slice(), {
          xOffset: 100,
          yOffset: 100,
        });
        setTreeGraph(result);
        initGraph();
        result.forEach((graph) => {
          // 根据树，深度遍历链接，包含折叠操作
          deepConnect(graph);
        });
      }, 300)
    }
  }, [nodes]);
  return (
    <div className="real-tree-graph-wraper" id="container">
      {nodes.map((n) => {
        return <div
          className="tree-item"
          id={`${n.id}`}
          key={`${ID_SUFFIX}${n.id}`}
          style={{ left: n.x, top: n.y }}
        >
          {n.name}
        </div>
      })}
    </div>
  );
};
export default RealTreeGraph;
