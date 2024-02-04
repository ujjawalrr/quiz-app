import React, { useCallback, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';

import 'reactflow/dist/style.css';


export default function Test() {
  const initialNodes=[
    { id: 'q1', sourcePosition: 'right', position: { x: 100, y: 100 }, data: { label: 'Question 1' }, draggable: false },
    { id: 'q2', sourcePosition: 'right', position: { x: 100, y: 200 }, data: { label: 'Question 2' }, draggable: false },
    { id: 'q3', sourcePosition: 'right', position: { x: 100, y: 300 }, data: { label: 'Question 3' }, draggable: false },
    { id: 'q4', sourcePosition: 'right', position: { x: 100, y: 400 }, data: { label: 'Question 4' }, draggable: false },
    { id: 'o1', targetPosition: 'left', sourcePosition: 'top', position: { x: 300, y: 100 }, data: { label: 'Option 1' }, draggable: false },
    { id: 'o2', targetPosition: 'left', sourcePosition: 'top', position: { x: 300, y: 200 }, data: { label: 'Option 2' }, draggable: false },
    { id: 'o3', targetPosition: 'left', sourcePosition: 'top', position: { x: 300, y: 300 }, data: { label: 'Option 3' }, draggable: false },
    { id: 'o4', targetPosition: 'left', sourcePosition: 'top', position: { x: 300, y: 400 }, data: { label: 'Option 4' }, draggable: false },
  ]

  const initialEdges = [
    { id: 'eq1-o2', source: 'q1', target: 'o2' }
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params)=>{
    console.log(params, "Params17")
    setEdges([...initialEdges, {id: `e${params.source}-${params.target}`, source: params.source, target: params.target}])
  }
  console.log(initialEdges)
  // const onConnect = useCallback((params) => {
  //   setInitialEdges([...initialEdges, {id: 'eq1-o2', source: params.source, target: params.target}])
  //   console.log(params, "Params17")
  //   setEdges((eds) => {
  //     console.log(eds, 'eds 19')
  //     addEdge(params, eds)
  //   })
  // }, [setEdges],);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
}