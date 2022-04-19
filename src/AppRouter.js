import React, { useMemo, useState } from 'react';
import LoginPage from './LoginPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './firebase';
import UserContext from './SharedComponents/UserContext';
import ObjectLinker from './SharedComponents/ObjectLinker';

function AppRouter(props) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const value = useMemo(
    () => ({ user, setUser }),
    [user]
  );

  const getUserData = async (_user) => {
    const snapshot = await getDoc(doc(db, "Users", _user.uid));
    //add error handling for no data
    _user.data = snapshot.data();
    setLoadingAuth(false);
    setUser(_user);
  }

  getAuth().onAuthStateChanged((_user) => {
    if(_user) {
      getUserData(_user);
    } else {
      setLoadingAuth(false);
    }
  });

  if(loadingAuth)
    return <h1>Loading...</h1>

  return (
    <UserContext.Provider value={ value }>
      <Router>
        <Routes>
          {
            user ?
            <>
              <Route path="/" element={ props.children } />
              <Route path="/Courses/*" element={ <ObjectLinker /> } />
              <Route path="/Events/*" element={ <ObjectLinker /> } />
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
    </UserContext.Provider>
  );
}

export default AppRouter;