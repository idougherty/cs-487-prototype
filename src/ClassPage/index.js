import Header from '../SharedComponents/Header';
import NavBar from '../SharedComponents/NavBar';
import './index.css';

function ClassPage(props) {
  return (
    <div className='app-page'>
      <Header subheader={ props.className } />
      <div className='columns is-mobile app-body'>
        <NavBar classes={ props.classes } currentClass={ props.className } />
        <div className='app-content'>
          <h1>~ Chat Placeholder ~</h1>
        </div>
      </div>
    </div>
  );
}

export default ClassPage;
