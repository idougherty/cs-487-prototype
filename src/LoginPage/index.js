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
    <div>
      <h1>Welcome to Class Connect!</h1>
      <button onClick={ () => setTab("log in") }>Log In</button>
      <button onClick={ () => setTab("sign up") }>Sign Up</button>
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
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email"/> <br/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password"/> <br/>
      <button type='submit'>Log In</button>
    </form>
  );
}

function SignUpForm(props) {
  return (
    <form className="form-sign-up" onSubmit={ props.handler }>
      <label htmlFor="userType">User Type:</label>
      <select id="userType" name="userType">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select> <br/>
      <label htmlFor="fname">First Name:</label>
      <input type="text" id="fname" name="fname"/> <br/>
      <label htmlFor="lname">Last Name:</label>
      <input type="text" id="lname" name="lname"/> <br/>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email"/> <br/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password"/> <br/>
      <label htmlFor="cpassword">Confirm Password:</label>
      <input type="password" id="cpassword" name="cpassword"/> <br/>
      <button type='submit'>Sign Up</button>
    </form>
  );
}

export default LoginPage;
