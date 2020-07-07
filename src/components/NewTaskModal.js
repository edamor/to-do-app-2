import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'uuid/v4';
import addPlain from '../imgs/add-plain.png';
import minusPlain from '../imgs/minus-plain.png';


function NewTaskModal(props) {

   let history = useHistory();

   let newTaskInputRef = useRef(null);

   let [newTasks, setNewTasks] = useState([{ id: uuid(), taskName: "", status: "New" }]);

   function submitTask() {
      let pushThis = newTasks.filter((item) => item.taskName !== "");
      props.add(pushThis);
      setNewTasks([{ id: uuid(), taskName: "", status: "New" }]);
      history.push("/")
   }
   

   function closeModal(e) {
      if (e.target.classList.contains("add-task-modal")) {
         props.toggle();
         setNewTasks([{ id: uuid(), taskName: "", status: "New" }]);
      } 
   }

   function handleChange(e, index) {
      newTasks[index].taskName = e.target.value.trim();
   }
   
   function showInputField(params) {
      let inputFields = newTasks.map((item,index) => {
         return (
            <div key={item.id} >
               <input
                  ref={newTaskInputRef}
                  type="text"
                  className="add-task-modal-input"
                  placeholder="Type your task here"
                  onChange={(e) => handleChange(e,index)}
               />
            </div>
         )
      })
      return inputFields;
   }
   
   function addInputField() {
      if (newTasks.length < 5) {
         let newTask = {id: uuid(), taskName: "", status: "New"};
         setNewTasks([...newTasks, newTask])
      }
   }

   function removeInputField() {
      if (newTasks.length > 1) {
         let popped = newTasks.filter((item, index, array) => index < array.length - 1);
         setNewTasks(popped);
      }
   }
   
   function handleDone() {
      props.toggle();
      setNewTasks([{ id: uuid(), taskName: "", status: "New" }]);
   }


   useEffect(() => {
      if (newTaskInputRef && newTaskInputRef.current) {
         newTaskInputRef.current.focus()
      }
   });

   function isVisible() {
      if (props.isVisible) {
         return (
            <div className="add-task-modal" onClick={closeModal}>
               <div className="add-task-modal-contents">
                  <p className="h6 add-task-modal-header" >Add Tasks</p>
                  <div className="add-task-modal-body">
                     <form >
                        <div className="add-task-modal-add-input-button-wrap" >
                           <div className="add-task-modal-add-input-button" onClick={addInputField} >
                              <img className="add-task-modal-add-input-img" src={addPlain} alt="add input field button" />
                           </div>
                           <div className="add-task-modal-add-input-button" onClick={removeInputField}>
                              <img className="add-task-modal-add-input-img" src={minusPlain} alt="remove input field button" />
                           </div>
                        </div>
                        {showInputField()}
                        <div className="add-task-modal-submit" onClick={submitTask}>
                           <p className="add-task-modal-submit-button btn">Submit</p>
                        </div>
                        <div className="add-task-modal-back" onClick={handleDone}>
                           <p className="add-task-modal-back-button btn">Done</p>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )
      }
   }


   return (
      <React.Fragment>
         {isVisible()}
      </React.Fragment>
   )
}


export default NewTaskModal;