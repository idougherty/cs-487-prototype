import './index.css';

function LoginPage() {
  function handleSubmit(e) {
    e.preventDefault();
    window.location.href = "./";
  }

  return (
    <div>
      <h1>Log In!</h1>
      <form onSubmit={ handleSubmit }>
        <label for="email">Email:</label>
        <input type="text" id="email" name="email"/> <br/> <br/>
        <label for="password">Password:</label>
        <input type="text" id="password" name="password"/> <br/> <br/>
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
