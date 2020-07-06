import React from 'react';
import { NavLink } from 'react-router-dom';


function Nav() {
   

   return (
      <div className="nav-container" >
         <ul className="text-center nav-menu" >
            <li>
               <NavLink to="/"
                  exact
                  activeClassName="nav-active"
                  className="nav-item"
               >
                  Tasks
            </NavLink>
            </li>
            <li>
               <NavLink to="/new"
                  activeClassName="nav-active"
                  className="nav-item"
               >
                  New
            </NavLink>
            </li>
            <li>
               <NavLink to="/ongoing"
                  activeClassName="nav-active"
                  className="nav-item"
               >
                  Ongoing
            </NavLink>
            </li>
            <li>
               <NavLink to="/finished"
                  activeClassName="nav-active"
                  className="nav-item"
               >
                  Finished
            </NavLink>
            </li>
         </ul>
      </div>
   )
}


export default Nav;