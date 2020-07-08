import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Task from './Task';
import uuid from 'uuid/v4';
import addBtn from '../imgs/add.png';


function Container() {

   let { pathname } = useLocation();

   let [header, setHeader] = useState("My Tasks");
   

   let [tasks, setTasks] = useState([
      { id: uuid(), taskName: "Double-click or tap here to edit", status: "New", onEdit: false }
   ]);


   let addTask = () => {
      window.scrollTo({top: 0, left: 0, behavior: "smooth"});
      let newTask = { id: uuid(), taskName: "", status: "New", onEdit: true};
      setTasks([newTask, ...tasks])
   }

   let editTask = (taskID, newName) => {
      let editedTask = tasks.map((item) => {
         if (taskID === item.id) {
            item.taskName = newName;
            return item;
         } return item;
      })
      setTasks(editedTask);
   }

   let editInputToggle = (taskID) => {
      let showInput = tasks.map((item) => {
         if (taskID === item.id) {
            if (!item.onEdit) {
               item.onEdit = true;
               return item;
            } else {
               item.onEdit = false;
               return item;
            }
         }
         return item;
      })
      setTasks(showInput);
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


   function showTasks() { 
      if (pathname === "/new") {
         return tasks.filter(item => item.status === "New").map((item) => {
            return (
               <Task
                  key={item.id}
                  task={item}
                  start={doTask}
                  finish={finishTask}
                  undo={undoTask}
                  delete={deleteTask}
                  edit={editTask}
                  toggleInput={editInputToggle}
               />
            )
         });
      } else if (pathname === "/ongoing") {
         return tasks.filter(item => item.status === "Ongoing").map((item) => {
            return (
               <Task
                  key={item.id}
                  task={item}
                  start={doTask}
                  finish={finishTask}
                  undo={undoTask}
                  delete={deleteTask}
                  edit={editTask}
                  toggleInput={editInputToggle}
               />
            )
         });
      } else if (pathname === "/finished") {
         return tasks.filter(item => item.status === "Finished").map((item) => {
            return (
               <Task
                  key={item.id}
                  task={item}
                  start={doTask}
                  finish={finishTask}
                  undo={undoTask}
                  delete={deleteTask}
                  edit={editTask}
                  toggleInput={editInputToggle}
               />
            )
         });
      } else return tasks.filter(item => item.status !== "Deleted").map((item) => {
               return (
                  <Task
                     key={item.id}
                     task={item}
                     start={doTask}
                     finish={finishTask}
                     undo={undoTask}
                     delete={deleteTask}
                     edit={editTask}
                     toggleInput={editInputToggle}
                  />
               )
            });
   }

   let handlePage = () => {
      let p = pathname;
      if (p === "/new") {
         setHeader("New");
      } else if (p === "/ongoing") {
         setHeader("Ongoing");
      } else if (p === "/finished") {
         setHeader("Finished");
      } else {
         setHeader("My Tasks");
      }
   }

   let containerRef = useRef(null);
   let titleRef = useRef(null);

   useEffect(() => {
      handlePage();
   });
   


   return (
      <div className="container">
         <p className="h4 text-center" ref={titleRef}> {header} </p>
         <div className="add-button" >
            <img src={addBtn} alt="add button" className="add-button-img" onClick={addTask} />
         </div>
         <div className=" default" ref={containerRef}>
            <div className="header-container">
               <div className="header-title">
                  <p className="h6 header-title-text">
                     Title
                  </p>
               </div>
               <div className="header-actions text-center"> 
                  <p className="h6 header-action-text">
                     Actions
                  </p>
               </div>
            </div>
            <div className="" >
               {showTasks()}
            </div>
         </div>
      </div>
   )
}


export default Container;