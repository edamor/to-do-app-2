import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Task from './Task';
import uuid from 'uuid/v4';
import addBtn from '../imgs/add.png';
import NewTaskModal from '../components/NewTaskModal';


function Container() {

   let { pathname } = useLocation();

   let [header, setHeader] = useState("All Tasks");
   let [bgColor, setBgColor] = useState("container-task default");
   let [titleShadow, setTitleShadow] = useState("h3 text-center title-shadow-default");
   
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

   let handlePage = () => {
      let p = pathname;
      if (p === "/new") {
         setHeader("New");
         setBgColor("container-task red");
         setTitleShadow("h3 text-center title-shadow-red");
      } else if (p === "/ongoing") {
         setHeader("Ongoing");
         setBgColor("container-task yellow");
         setTitleShadow("h3 text-center title-shadow-yellow");
      } else if (p === "/finished") {
         setHeader("Finished");
         setBgColor("container-task blue");
         setTitleShadow("h3 text-center title-shadow-blue");
      } else {
         setHeader("All Tasks");
         setBgColor("container-task default");
         setTitleShadow("h3 text-center title-shadow-default");
      }
   }

   let containerRef = useRef(null);
   let titleRef = useRef(null);

   useEffect(() => {
      handlePage();
      if (containerRef && containerRef.current) {
         console.log(containerRef.current.classList)
         containerRef.current.className = bgColor;
      }
      if (titleRef && titleRef.current) {
         titleRef.current.className = titleShadow;
      }
   });
   

   console.log(titleRef.current)

   return (
      <div className="container">
         <p className="" ref={titleRef}> {header} </p>
         <div className="add-button" >
            <div className="add-button-wrap btn" onClick={showModal}>
               <span className="add-button-text">Add Task</span>
               <img src={addBtn} alt="add button" className="add-button-img" />
            </div>
            <NewTaskModal isVisible={newTaskModal} toggle={showModal} add={addTask}  />
         </div>
         <div className="" ref={containerRef}>
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
               {showTasks}
            </div>
         </div>
      </div>
   )
}


export default Container;