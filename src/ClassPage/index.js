import Header from '../SharedComponents/Header';
import ChatList from './ChatList';
import './index.css';

const chats = [
  {
    name: "General"
  },
  {
    name: "Assignments"
  },
  {
    name: "Resouce Hub"
  },
];

function ClassPage(props) {
  return (
    <div className='app-page'>
      <Header subheader={ props.className } />
      <div className='columns app-body'>
        { props.navBar }
        <ChatList chats={ chats } />
        <div className='app-content'>
          <h1>~ Chat Placeholder ~</h1>
        </div>
      </div>
    </div>
  );
}

export default ClassPage;
