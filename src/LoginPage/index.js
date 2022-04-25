import { useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import './index.css';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function LoginPage() {
  const [tab, setTab] = useState("log in");
  const [error, setError] = useState(null);
  const auth = getAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }

  const handleSignUp = (e) => {
    e.preventDefault();

    const userType = e.target.userType.value;
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const cpassword = e.target.cpassword.value;
  
    if(password !== cpassword)
      return setError({ code: "123", message: "Your passwords do not match." });
  
    if(email.substring(email.length - 13) !== "@hawk.iit.edu")
      return setError({ code: "123", message: "Your email must end with '@hawk.iit.edu'" });
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userData = {
          fname: fname,
          lname: lname,
          email: email,
          userType: userType,
          courses: [],
          events: [],
        }

        setDoc(doc(db, "Users", userCredential.user.uid), userData);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className='login-container'>
      <h1 className='title is-3'>Welcome to Class Connect!</h1>
      <div className='tabs is-centered'>
        <ul>
          <li className={tab == "log in" && "is-active"}>
            <button className='button' onClick={ () => setTab("log in") }>Log In</button>
          </li>
          <li className={tab == "log in" && "is-active"}>
            <button className='button' onClick={ () => setTab("sign up") }>Sign Up</button>
          </li>
        </ul>
      </div>
      {(tab === "log in")
        ? <LoginForm handler={ handleLogin }/> 
        : <SignUpForm handler={ handleSignUp }/>}
      {(error) && <h4>{error.message}</h4>}
    </div>
  );
}

function LoginForm(props) {
  return (
    <form className="form-log-in" onSubmit={ props.handler }>
      <div className='field'>
        <label htmlFor="email">Email:</label>
        <div className='control'>
          <input className='input' type="text" id="email" name="email"/>
        </div>
      </div>
      
      <div className='field'>
        <label htmlFor="password">Password:</label>
        <div className='control'>
          <input className='input' type="password" id="password" name="password"/>
        </div>
      </div>
      <button className="button is-link" type='submit'>Log In</button>
    </form>
  );
}

function SignUpForm(props) {
  return (
    <form className="form-sign-up" onSubmit={ props.handler }>
      <div className='field'>
        <label htmlFor="userType">User Type:</label>
        <div className='control'>
          <select className='select' id="userType" name="userType">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
      </div>
      
      <div className='field'>
        <label htmlFor="fname">First Name:</label>
        <div className='control'>
          <input className='input' type="text" id="fname" name="fname"/>
        </div>
      </div>
      
      <div className='field'>
        <label htmlFor="lname">Last Name:</label>
        <div className='control'>
          <input className='input' type="text" id="lname" name="lname"/>
        </div>
      </div>
      
      <div className='field'>
        <label htmlFor="email">Email:</label>
        <div className='control'>
          <input className='input' type="text" id="email" name="email"/>
        </div>
      </div>
      
      <div className='field'>
        <label htmlFor="password">Password:</label>
        <div className='control'>
          <input className='input' type="password" id="password" name="password"/>
        </div>
      </div>
      
      <div className='field'>
        <label htmlFor="cpassword">Confirm Password:</label>
        <div className='control'>
          <input className='input' type="password" id="cpassword" name="cpassword"/>
        </div>
      </div>
      <button className='button is-link' type='submit'>Sign Up</button>
    </form>
  );
}

export default LoginPage;
