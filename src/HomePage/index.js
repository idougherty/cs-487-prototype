import Calendar from './Calendar';
import Header from '../SharedComponents/Header'
import EventList from './EventList';
import NavBar from '../SharedComponents/NavBar';
import './index.css';

const testEvents = [
  {
    class: "CS-487",
    title: "HW #1",
    date: new Date('April 17, 2022 03:15')
  },
  {
    class: "CS-440",
    title: "MP #1",
    date: new Date('April 20, 2022 03:15')
  },
  {
    class: "Math 332",
    title: "Exam #2",
    date: new Date('April 22, 2022 03:15')
  },
]

function HomePage(props) {
  return (
    <div className='app-page'>
      <Header subheader="Home"/>
      <div className='columns is-mobile app-body'>
        <NavBar classes={ props.classes } />
        <div className='column columns is-mobile app-content'>
          <EventList events={ testEvents }/>
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
