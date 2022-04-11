import { useState } from 'react';
import './index.css';

function handleLogin(e) {
  e.preventDefault();
  window.location.href = "./";
}

function handleSignUp(e) {
  e.preventDefault();
  window.location.href = "./";
}

function LoginPage() {
  const [tab, setTab] = useState("log in");

  return (
    <div>
      <h1>Welcome to Class Connect!</h1>
      <button onClick={ () => setTab("log in") }>Log In</button>
      <button onClick={ () => setTab("sign up") }>Sign Up</button>
      {(tab === "log in") ?
        <form className="form-log-in" onSubmit={ handleLogin }>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email"/> <br/>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password"/> <br/>
          <button type='submit'>Log In</button>
        </form>
        :
        <form className="form-sign-up" onSubmit={ handleSignUp }>
          <label for="email">Email:</label>
          <input type="text" id="email" name="email"/> <br/>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password"/> <br/>
          <label for="confirm-pass">Confirm Password:</label>
          <input type="password" id="confirm-pass" name="confirm-pass"/> <br/>
          <button type='submit'>Sign Up</button>
        </form>
      }
    </div>
  );
}

export default LoginPage;
