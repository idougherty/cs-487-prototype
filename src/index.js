import React from 'react';
import { createRoot } from 'react-dom/client';
import ClassPage from './ClassPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import NavBar from './SharedComponents/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./index.css"

let testClasses = [
  "CS-487", "CS-440", "PHYS-221", "MATH-332"
];

const navBar = <NavBar classes={ testClasses } />

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/" element={ <HomePage navBar={ navBar } /> }/>
          {testClasses.map((className, idx) =>
            <Route key={ idx } 
            path={ "/"+className } 
            element={ <ClassPage navBar={ navBar } className={ className }/> }/>
            )}
        </Routes>
      </Router>
  </React.StrictMode>
);
