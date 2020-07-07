import React from 'react';
import playBtn from '../imgs/play.png';
import checkBtn from '../imgs/check.png';
import undoBtn from '../imgs/undo.png';
import deleteBtn from '../imgs/garbage.png';


function ActionButton(props) {

   function handleStart() {
      props.start(props.task.id)
   }

   function handleFinish() {
      props.finish(props.task.id)
   }

   function handleUndo() {
      props.undo(props.task.id)
   }

   function handleDelete() {
      props.delete(props.task.id)
   }
   
   let actionButtons = () => {
      if (props.task.status === "New") {
         return (
            <div className="action-button" onClick={handleStart} >
               <img src={playBtn} alt="play button" className="action-button-img" />
            </div>
         )
      } else if (props.task.status === "Ongoing") {
         return (
            <div className="action-button" onClick={handleFinish}>
               <img src={checkBtn} alt="check button" className="action-button-img" />
            </div>
         )
      } else return (
         <div className="action-button" onClick={handleUndo}>
            <img src={undoBtn} alt="undo button" className="action-button-img" />
         </div>
      )
   };

   return (
      <React.Fragment>
         {actionButtons()}
         <div className="delete-button" onClick={handleDelete}>
            <img src={deleteBtn} alt="delete button" className="delete-button-img" />
         </div>
      </React.Fragment>
   )
}


export default ActionButton;