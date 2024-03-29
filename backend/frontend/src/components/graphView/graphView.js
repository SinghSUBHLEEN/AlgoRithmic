import { React, useCallback } from "react";
import "./graphView.css";
import Nav from "../Navbar/Navbar";
import { Container, Row } from 'react-bootstrap';
import ReactFlow, { Controls, Background, MiniMap, ReactFlowProvider, addEdge, useEdgesState, useNodesState, StraightEdge } from 'reactflow';
import 'reactflow/dist/base.css';
import CustomNode from "./customNode";

const nodeTypes = {
    custom: CustomNode,
};


const Graph = () => {



    const defEdges = [{ source: 'Basics', target: 'Searching and Sorting' }, { source: 'Basics', target: 'Arrays and Hashing' }, { source: 'Basics', target: 'Strings' }, { source: 'Arrays and Hashing', target: 'Prefix Sum' }, { source: 'Arrays and Hashing', target: 'Linked List' }, { source: 'Searching and Sorting', target: 'Two Pointers' }, { type: "custom", source: 'Searching and Sorting', target: 'Binary Search' }, { type: "custom", source: 'Searching and Sorting', target: 'Sets and Hashmap' }, { type: "custom", source: 'Sets and Hashmap', target: 'Sliding Window' }, { type: "custom", source: 'Prefix Sum', target: 'Sliding Window' }, { type: "custom", source: 'Two Pointers', target: 'Sliding Window' }, { type: "custom", source: 'Binary Search', target: 'Sliding Window' }, { type: "custom", source: 'Linked List', target: 'Stack' }, { type: "custom", source: 'Linked List', target: 'Queue' }, { type: "custom", source: 'Linked List', target: 'Stack' }, { type: "custom", source: 'Stack', target: 'Backtracking' }, { type: "custom", source: 'Sliding Window', target: 'Backtracking' }, { type: "custom", source: 'Backtracking', target: 'Bit Manipulation' }, { type: "custom", source: 'Backtracking', target: 'Trees' }, { type: "custom", target: 'Dynamic Programming', source: 'Bit Manipulation' }, { type: "custom", source: 'Trees', target: 'Tries' }, { type: "custom", source: 'Binary Search', target: 'Priority Queue/Heap' }, { type: "custom", source: 'Trees', target: 'Graphs' }, { type: "custom", source: 'Priority Queue/Heap', target: 'Greedy' }, { type: "custom", source: 'Greedy', target: 'Bit Manipulation' }, { type: "custom", source: 'Bit Manipulation', target: 'Segment Trees and BIT' }, { type: "custom", source: 'Greedy', target: 'Segment Trees and BIT' }, { type: "custom", source: 'Graphs', target: 'Segment Trees and BIT' }];

    const defNodes = [
        {
            id: 'Basics',
            data: { name: 'Basics' },
            position: { x: -300, y: -100 },
            type: 'custom',
        },
        {
            id: 'Searching and Sorting',
            data: { name: 'Searching and Sorting' },
            position: { x: -800, y: 50 },
            type: 'custom',
        },
        {
            id: 'Arrays and Hashing',
            data: { name: 'Arrays and Hashing' },
            position: { x: -300, y: 50 },
            type: 'custom',
        },
        {
            id: 'Strings',
            data: { name: 'Strings' },
            position: { x: 250, y: 50 },
            type: 'custom',
        },
        {
            id: 'Sets and Hashmap',
            data: { name: 'Sets and Hashmap' },
            position: { x: -1000, y: 200 },
            type: 'custom',
        },
        {
            id: 'Binary Search',
            data: { name: 'Binary Search' },
            position: { x: -620, y: 200 },
            type: 'custom',
        },
        {
            id: 'Two Pointers',
            data: { name: 'Two Pointers' },
            position: { x: -300, y: 200 },
            type: 'custom',
        }
        ,
        {
            id: 'Linked List',
            data: { name: 'Linked List' },
            position: { x: 300, y: 200 },
            type: 'custom',
        },
        {
            id: 'Prefix Sum',
            data: { name: 'Prefix Sum' },
            position: { x: 0, y: 200 },
            type: 'custom',
        }
        ,
        {
            id: 'Sliding Window',
            data: { name: 'Sliding Window' },
            position: { x: -300, y: 350 },
            type: 'custom',
        },
        {
            id: 'Stack',
            data: { name: 'Stack' },
            position: { x: 250, y: 350 },
            type: 'custom',
        },
        {
            id: 'Queue',
            data: { name: 'Queue' },
            position: { x: 450, y: 350 },
            type: 'custom',
        },
        {
            id: 'Backtracking',
            data: { name: 'Backtracking' },
            position: { x: -200, y: 500 },
            type: 'custom',
        },
        {
            id: 'Bit Manipulation',
            data: { name: 'Bit Manipulation' },
            position: { x: -600, y: 650 },
            type: 'custom',
        },
        {
            id: 'Trees',
            data: { name: 'Trees' },
            position: { x: 100, y: 650 },
            type: 'custom',
        },
        {
            id: 'Dynamic Programming',
            data: { name: 'Dynamic Programming' },
            position: { x: -750, y: 800 },
            type: 'custom',
        },
        {
            id: 'Tries',
            data: { name: 'Tries' },
            position: { x: 300, y: 800 },

            type: 'custom',
        },
        {
            id: 'Priority Queue/Heap',
            data: { name: 'Priority Queue/Heap' },
            position: { x: -800, y: 350 },
            type: 'custom',
        },
        {
            id: 'Graphs',
            data: { name: 'Graphs' },
            position: { x: -100, y: 800 },
            type: 'custom',
        },
        {
            id: 'Greedy',
            data: { name: 'Greedy' },
            position: { x: -850, y: 500 },
            type: 'custom',
        }
    ];

    const [nodes, setNodes, onNodesChange] = useNodesState(defNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(defEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    return <>
        <Row fluid style={{ textAlign: "center", height: "100vh", width: "100%" }} className="m-0 p-0 b-0">
            <ReactFlowProvider>
                <ReactFlow defaultNodes={nodes} defaultEdges={edges} style={{
                    backgroundColor: "#060606", paddingBottom: "2rem"
                }}
                    fitView
                    zoomOnScroll={false}
                    attributionPosition="bottom-right"
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                >
                    <Controls />
                </ReactFlow>
            </ReactFlowProvider>
        </Row>
    </>
}


export default Graph;
