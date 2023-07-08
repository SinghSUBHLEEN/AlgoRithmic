import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const handleNodeClick = (event) => {
    console.log("Node clicked " + event);
}

function CustomNode({ data }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <span onClick={() => {
                handleShow();
                handleNodeClick(data.name);
            }}>
                <div className="px-4 py-2 shadow-md rounded-md border-2 border-stone-400" style={{ backgroundColor: "#0039a6" }}>
                    <div className="flex">
                        <div className="ml-2">
                            <div className="text-4xl font-bold font-green" style={{ color: "ghostwhite" }}>{data.name}</div>
                        </div>
                    </div>

                    {data.name !== "Greedy" && data.name !== "Strings" && data.name !== "Sliding Window" && data.name !== "Stack" && data.name !== "Queue" && data.name !== "Tries" && data.name !== "Graphs" ? <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" /> : <></>}
                    {data.name !== "Basics" ? <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" /> : <></>}
                </div>
            </span>
            <Offcanvas show={show} onHide={handleClose} end>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default memo(CustomNode);
