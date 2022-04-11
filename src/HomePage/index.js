import './index.css';

function HomePage(props) {
  return (
    <div>
      <h1>Home Page</h1>
      { props.navBar }
    </div>
  );
}

export default HomePage;
