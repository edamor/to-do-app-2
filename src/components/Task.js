import React from 'react';
import ActionButton from './ActionButton';


function Task(props) {
   return (
      <div className="task-card-container">
         <div className="task-title">
            <p className="task-title-text"> {props.task.taskName} </p>
         </div>
         <div className="task-status text-center">
            <ActionButton task={props.task} start={props.start} finish={props.finish} undo={props.undo} delete={props.delete} />
         </div>
      </div>
   )
}


export default Task;