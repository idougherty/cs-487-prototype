import './index.css';

function ClassPage(props) {
  return (
    <div>
      <h1>{props.className}</h1>
      { props.navBar }
    </div>
  );
}

export default ClassPage;
