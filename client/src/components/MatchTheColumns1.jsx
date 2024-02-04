// import React, { useState } from "react";
// import Xarrow, { useXarrow, xarrowPropsType, Xwrapper } from "react-xarrows";
// import Draggable from "react-draggable";

// const boxStyle = {
//   border: "1px #999 solid",
//   borderRadius: "10px",
//   textAlign: "center",
//   width: "100px",
//   height: "30px",
//   color: "black",
//   alignItems: "center",
//   display: "flex",
//   justifyContent: "center",
// };

// const canvaStyle = {
//   width: "100%",
//   height: "100vh",
//   background: "white",
//   overflow: "auto",
//   display: "flex",
//   color: "black",
//   cursor: "pointer",
// };

// const DraggableBox = ({ box, onClick }) => {
//   return (
//     <div
//       id={box.id}
//       style={{ ...boxStyle }}
//       onClick={() => {
//         onClick(box.id);
//       }}
//     >
//       {box.id}
//     </div>
//   );
// };

// const boxArray = [
//   {
//     id: "box1",
//     child: [
//       { id: "box2", x: 20, y: 20 },
//       { id: "box3", x: 20, y: 20 },
//       { id: "box4", x: 20, y: 20 },
//       { id: "box5", x: 20, y: 20 },
//     ],
//   },
//   {
//     id: "box6",
//     child: [
//       { id: "box7", x: 20, y: 20 },
//       { id: "box8", x: 20, y: 20 },
//       { id: "box9", x: 20, y: 20 },
//       { id: "box10", x: 20, y: 20 },
//     ],
//   },
// ];

// const MatchTheFollowing = () => {
//     const updateXarrow = useXarrow();
//     const scrollFunc = () => {
//       console.log("hi");
//       updateXarrow();
//     };
  
//     const [point, setPoint] = useState({
//       start: null,
//       end: null,
//     });
//     const [connection, setConnection] = useState([]);
  
//     const setEndpoints = (e, id) => {
//       e.stopPropagation();
//       if (point.start && point.start !== id) {
//         setPoint({
//           ...point,
//           end: id,
//         });
//         e.target.classList.add("bg-blue-500 hover:bg-blue-700");
//         setConnection([...connection, { start: point.start, end: id }]);
//         setPoint({
//           start: null,
//           end: null,
//         });
//       } else {
//         setPoint({
//           ...point,
//           start: id,
//         });
//         e.target.classList.add("bg-blue-500 hover:bg-blue-700");
//       }
//     };
  
//     const connectNode = (e, id) => {
//       e.stopPropagation();
//       const draggedBoxId = point.start;
//       if (draggedBoxId && draggedBoxId !== id) {
//         setEndpoints(e, id);
//       }
//     };
  
//     const stopConnection = (e) => {
//       document.onmousemove = null;
//       document.onmousedown = null;
//     };
  
//     const removeConnection = (item) => {
//       const newarray = connection;
//       const index = newarray.findIndex((items) => items === item);
//       newarray.splice(index, 1);
//       setConnection([...newarray]);
//       document
//         .getElementById(item.start)
//         .classList.remove("bg-blue-500 hover:bg-blue-700");
//       document
//         .getElementById(item.end)
//         .classList.remove("bg-blue-500 hover:bg-blue-700");
//     };
  
//     return (
//       <>
//         {/* ... (styles) */}
//         <div style={canvaStyle} id="canvas" onScroll={scrollFunc}>
//           <Xwrapper>
//             {boxArray.map((items) => (
//               <Draggable
//                 key={items.id}
//                 handle=".handle"
//                 onDrag={updateXarrow}
//                 onStop={updateXarrow}
//               >
//                 <div className="container-side" id={items.id}>
//                   <h3 className="handle">{items.id}</h3>
//                   {items.child.map((item) => (
//                     <div
//                       key={item.id}
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <div
//                         id={item.id}
//                         style={{ ...boxStyle }}
//                         onClick={(e) => setEndpoints(e, item.id)}
//                         onMouseDown={(e) => connectNode(e, item.id)}
//                       >
//                         {item.id}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </Draggable>
//             ))}
//             {connection.length
//               ? connection.map((items) => (
//                   <React.Fragment key={`${items.start}-${items.end}`}>
//                     <div
//                       className="line"
//                       style={{
//                         position: "absolute",
//                         top: document.getElementById(items.start).offsetTop + 15,
//                         left: document.getElementById(items.start).offsetLeft + 50,
//                         width: document.getElementById(items.end).offsetLeft - document.getElementById(items.start).offsetLeft,
//                       }}
//                     ></div>
//                     <Xarrow
//                       key={`${items.start.x}-${items.start.y}-${items.end.x}-${items.end.y}`}
//                       start={items.start}
//                       end={items.end}
//                       labels={
//                         <i
//                           className="fas fa-times"
//                           style={{ cursor: "pointer" }}
//                           onClick={() => removeConnection(items)}
//                         ></i>
//                       }
//                       startAnchor="auto"
//                     />
//                   </React.Fragment>
//                 ))
//               : ''}
//           </Xwrapper>
//         </div>
//       </>
//     );
//   };
  
//   export default MatchTheFollowing;