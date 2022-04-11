import Calendar from './Calendar';
import Header from '../SharedComponents/Header'
import './index.css';
import EventList from './EventList';

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
    <div>
      <Header subheader="Home"/>
      { props.navBar }
      <EventList events={ testEvents }/>
      <Calendar />
    </div>
  );
}

export default HomePage;
