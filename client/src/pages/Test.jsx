import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes=[
  { id: 'q1', sourcePosition: 'right', positionAbsolute: { x: 100, y: 100 }, position: { x: 100, y: 100 }, data: { label: 'Question 1' }, draggable: false },
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

function Test() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div>
      <div>
        
      </div>
      <div className='relative w-[500px] h-[500px]'>
      <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    />
    </div>
    </div>
  );
}

export default Test;