import React, { useState, useRef } from 'react';
import ActionButton from './ActionButton';
import confirmBtn from '../imgs/confirm.png';
import cancelBtn from '../imgs/cancel.png';


function Task(props) {

   let inputRef = useRef(null);
   
   let toggle = () => {
      props.toggleInput(props.task.id);
   }

   let [newTaskName, setNewTaskName] = useState(props.task.taskName);
   let handleChange = (e) => {
      if (e.target.value.trim() !== "") {
         setNewTaskName(e.target.value.trim())
      }
   }
   
   let handleCancel = () => {
      setNewTaskName(props.task.taskName)
      props.toggleInput(props.task.id);
   }

   let handleConfirm = () => {
      props.edit(props.task.id, newTaskName);
      props.toggleInput(props.task.id);
   }

   let showTaskTitle = () => {
      if (!props.task.onEdit) {
         return (
            <div className="task-title" onDoubleClick={toggle} onTouchEnd={toggle} >
               <p className="task-title-text" > {props.task.taskName} </p>
            </div>
         )
      } else return (
         <div className="task-title">
            <input 
               type="text" 
               className="task-title-input" 
               ref={inputRef} 
               onChange={handleChange} 
               value={newTaskName}
               placeholder="Type task here..." 
               autoFocus 
            />
            <div className="edit-button-wrap">
               <img src={confirmBtn} alt="confirm button" className="edit-button-img" onClick={handleConfirm} />
               <img src={cancelBtn} alt="confirm button" className="edit-button-img" onClick={handleCancel} />
            </div>
         </div>
      )
   }

   return (
      <div className="task-card-container">
         {showTaskTitle()}
         <div className="task-status text-center">
            <ActionButton task={props.task} start={props.start} finish={props.finish} undo={props.undo} delete={props.delete} />
         </div>
      </div>
   )
}


export default Task;