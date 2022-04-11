import React from 'react';
import ReactDOM from 'react-dom';
import ClassPage from './ClassPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import NavBar from './SharedComponents/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

let classes = [
  "CS-487", "CS-440", "PHYS-221", "MATH-332"
];

const navBar = <NavBar classes={ classes } />

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={ <LoginPage/> }/>
        <Route path="/" element={ <HomePage navBar={ navBar } /> }/>
        {classes.map(className =>
          <Route path={ "/"+className } element={ <ClassPage navBar={ navBar } className={ className }/> }/>
        )}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
