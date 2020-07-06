import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Task from './Task';
import uuid from 'uuid/v4';
import addBtn from '../imgs/add.png';
import NewTaskModal from '../components/NewTaskModal';


function Container() {

   let { pathname } = useLocation();

   let [header, setHeader] = useState("All Tasks");
   
   let [tasks, setTasks] = useState([
      { id: uuid(), taskName: "Example Task 1", status: "New" },
      { id: uuid(), taskName: "Example Task 2", status: "Ongoing" },
      { id: uuid(), taskName: "Example Task 3", status: "Finished" }
   ]);

   let [newTaskModal, setNewTaskModal] = useState(false);

   let addTask = (newTasks) => {
      setTasks([...newTasks, ...tasks])
   }

   let doTask = (taskID) => {
      let ongoingTask = tasks.map((item) => {
         if (taskID === item.id) {
            item.status = "Ongoing";
            return item;
         } else return item;
      })
      setTasks(ongoingTask);
   }

   let finishTask = (taskID) => {
      let finishedTask = tasks.map((item) => {
         if (taskID === item.id) {
            item.status = "Finished";
            return item;
         } else return item;
      })
      setTasks(finishedTask);
   }

   let undoTask = (taskID) => {
      let undoneTask = tasks.map((item) => {
         if (taskID === item.id) {
            item.status = "Ongoing";
            return item;
         } else return item;
      })
      setTasks(undoneTask);
   };

   let deleteTask = (taskID) => {
      let deletedTask = tasks.map((item) => {
         if (taskID === item.id) {
            item.status = "Deleted";
            return item;
         } else return item;
      })
      setTasks(deletedTask);
   };

   let showTasks = tasks.map((item) => {
      if (item.status !== "Deleted") {
         if (pathname === "/new") {
            if (item.status === "New") {
               return (
                  <Task
                     key={item.id} 
                     task={item}
                     start={doTask}
                     finish={finishTask}
                     undo={undoTask}
                     delete={deleteTask}
                  />
               )
            }
         } else if (pathname === "/ongoing") {
            if (item.status === "Ongoing") {
               return (
                  <Task
                     key={item.id}
                     task={item}
                     start={doTask}
                     finish={finishTask}
                     undo={undoTask}
                     delete={deleteTask}
                  />
               )
            }
         } else if (pathname === "/finished") {
            if (item.status === "Finished") {
               return (
                  <Task
                     key={item.id}
                     task={item}
                     start={doTask}
                     finish={finishTask}
                     undo={undoTask}
                     delete={deleteTask}
                  />
               )
            }
         } else return (
            <Task
               key={item.id}
               task={item}
               start={doTask}
               finish={finishTask}
               undo={undoTask}
               delete={deleteTask}
            />
         )
      }
   })

   let showModal = () => {
      !newTaskModal ? setNewTaskModal(true) : setNewTaskModal(false)
   }

   let showHeader = () => {
         pathname === "/new" ? setHeader("New")
      :  pathname === "/ongoing" ? setHeader("Ongoing")
      :  pathname === "/finished" ? setHeader("Finished")
      :  setHeader("All Tasks")
   }

   useEffect(() => {
      showHeader();
   });


   return (
      <div className="container">
         <p className="h3 text-center"> {header} </p>
         <div className="add-button" >
            <div className="add-button-wrap" onClick={showModal}>
               <span className="add-button-text">Add Task</span>
               <img src={addBtn} alt="add button" className="add-button-img" />
            </div>
            <NewTaskModal isVisible={newTaskModal} toggle={showModal} add={addTask} />
         </div>
         <div className="header-container">
            <div className="header-title text-center">
               <p className="h6">
                  Title
               </p>
            </div>
            <div className="header-actions text-center"> 
               <p className="h6 header-action-text">
                  Actions
               </p>
            </div>
         </div>
         <div>
            {showTasks}
         </div>
      </div>
   )
}


export default Container;