import React,{useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import 'react-sortable-tree/style.css';
import SortableTree, {removeNode, addNodeUnderParent} from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

// import NodeRendererDefault from './dragable-tree/node-renderer-default';

function App() {
  const [treeData, setTreeData] = useState(
    [
      { id: 0,title: 'Chicken', children: [{ id: 1,title: 'Egg' }] },
      { id: 2,title: 'Fish', children: [{ id: 3,title: 'fingerline' }] },
    ]
  );
  const [ idTemp, setIdTemp ] = useState(100);
  function addNode(props) {
    // toggleExpandedForAll();
    console.log(props);
    setIdTemp(idTemp+1);
    const newTree = addNodeUnderParent({
      treeData: treeData,
      newNode: { id: idTemp, title: `新增节点--${idTemp}` },
      depth: props.treeIndex,
      // minimumTreeIndex: props.treeIndex,
      expandParent: true,
      parentKey: props ? props.treeIndex : undefined,
      getNodeKey: ({ treeIndex }) => treeIndex,
    });
    console.log(newTree);
    setTreeData(newTree.treeData);
  }
  function deleteNode(props) {
    console.log(props.path);
    const newTree = removeNode({
      treeData,
      path: props.path,
      getNodeKey: ({ node }) => node.id
    });
    console.log(newTree);
    setTreeData(newTree.treeData);
  }
  
  return (
    <div className="App" style={{ height: 1000 }}>
      <SortableTree
          treeData={treeData}
          // nodeContentRenderer = {(data) => {
          //   return <NodeRendererDefault title={data.title} buttons={() => {
          //     return [
          //       <button>+</button>
          //     ]
          //   }}></NodeRendererDefault>
          // }}
          generateNodeProps = {(props) => {
            // props.lowerSiblingCounts = [];
            props.buttons = [
              <button onClick={() => addNode(props) }>+</button>,
              <button onClick={() => deleteNode(props)}>-</button>
            ]
            return props;
          }}
          getNodeKey={({ node }) => node.id}
          theme={FileExplorerTheme}
          onChange={treeData => setTreeData(treeData)}
        />
    </div>
  );
}

export default App;
