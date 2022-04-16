import { useContext, useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from 'firebase/auth';
import './index.css';
import AuthContext from '../SharedComponents/AuthContext';

function LoginPage() {
  const [tab, setTab] = useState("log in");
  const [error, setError] = useState(null);
  const {auth, setAuth} = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuth([true, userCredential.user.auth]);
      })
      .catch((error) => {
        setError(error);
      });
  }

  const handleSignUp = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const cpassword = e.target.cpassword.value;
  
    if(password != cpassword)
      return setError({ code: "123", message: "Your passwords do not match." });
  
    if(email.substring(email.length - 13) != "@hawk.iit.edu")
      return setError({ code: "123", message: "Your email must end with '@hawk.iit.edu'" });
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuth([true, userCredential.user.auth]);
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
