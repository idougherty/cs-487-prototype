import React, { useMemo, useState } from 'react';
import ClassPage from './ClassPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { getAuth } from 'firebase/auth';
import AuthContext from './SharedComponents/AuthContext';

let testClasses = [
  {
    name: "CS-487",
    channels: [
      { name: "General" },
      { name: "Assignments" },
      { name: "Resouce Hub" },
    ],
  },
  {
    name: "CS-440",
    channels: [
      { name: "General" },
      { name: "Assignments" },
      { name: "Resouce Hub" },
    ],
  },
  {
    name: "PHYS-221",
    channels: [
      { name: "General" },
      { name: "Assignments" },
      { name: "Resouce Hub" },
    ],
  },
  {
    name: "MATH-332",
    channels: [
      { name: "General" },
      { name: "Assignments" },
      { name: "Resouce Hub" },
    ],
  },
];

function App() {
  const [[isAuth, auth], setAuth] = useState([null, getAuth()]);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const value = useMemo(
    () => ({ auth, setAuth }),
    [auth]
  );

  auth.onAuthStateChanged((user) => {
    setLoadingAuth(false);

    if(user && !isAuth) {
      setAuth([true, user.auth]);
    }
  });

  if(loadingAuth)
    return <h1>Loading...</h1>

  return (
    <AuthContext.Provider value={ value }>
      <Router>
        <Routes>
          {
            isAuth ?
            <>  
              <Route path="/" element={ <HomePage classes={ testClasses } /> }/>
              {testClasses.map((clss, idx) =>
                <Route key={ idx } 
                path={ "/"+clss.name } 
                element={ <ClassPage classes={ testClasses } className={ clss.name }/> }/>
                )}  
              <Route path="*" element={ <Navigate to="/" /> } />
            </>
            : 
            <>
              <Route path="/login" element={ <LoginPage/> }/>
              <Route path="*" element={ <Navigate to="/login" /> } />
            </>
          }
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;