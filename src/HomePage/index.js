import './index.css';
import EventList from "./EventList";
import Header from "./Header";

import React from 'react'
import {useState} from 'react'
import "./Calendar.css";
import {Calendar as ReactCalendar} from 'react-calendar';


var store = require('store')

function HomePage(props) {
  //Get each object stored and make a list from it
  const getStoredEvents = () => {
    var eventList = []
    store.each(function(value, key) {
      eventList = [...eventList, store.get(key)] 
    })
    return eventList
  }

  const [events, setEvents] = useState( getStoredEvents() )

  const [showAddEvent, setshowAddEvent] = useState(false)

  /* Add Event */
  const addEvent = (event) => {
    const id = Math.floor(Math.random() * 50000) + 1 //for now, I just generate a random id
    const newEvent = {id, ...event}
    setEvents( [...events, newEvent] )
    store.set(id, newEvent)
    //The add event section will close after the user adds a event.
    //If you want the addEvent to remain open, remove the setshowAddEvent below.
    setshowAddEvent(false)
  }

  /* Delete Event function that takes a event id as an argument */
  const deleteEvent = (id) => {
    setEvents(events.filter( (event) => event.id !== id ))
    store.remove(id)
  }

  /* Toggle reminder */
  const toggleReminder = (id) => {
    console.log(id)
    setEvents(events.map( (event) => event.id === id ? { ...event, reminder: !event.reminder} : event ))
  }



  /* Date components */
  const [text, setText] = useState('')
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState(2022)

  const onSubmit = (e) => {
      e.preventDefault()
      if (!text) {
          alert('Please add text')
          return
      }
      addEvent( {text, day, month, year} )

      // clear form 
      setText('')
      setDay(1)
      setMonth(1)
      setYear(2022)
  }


  //Date states
  const [dateState, setDateState] = useState(new Date());

  //Determines what content is shown in each date tile of the calander
  const tileContent = ({date}) => {
    var i = 0;
    for (i=0; i < events.length; i++) {
      if ( date.getFullYear() === (events[i].year - 0) && date.getMonth() === (events[i].month - 1) && date.getDate() === (events[i].day - 0) ) {
        return <tileContent><b><p style={{ color: "#17caf7" }} >{events[i].text}</p></b></tileContent>
      }
    }
    return <p></p>
  }


  //When a date on the calendar is selected, open the add event with the date filled in
  function onChange(e) {
      setDateState(e);
      setText('')
      setDay(e.getDate())
      setMonth(e.getMonth()+1)
      setYear(e.getFullYear())
      setshowAddEvent(true);
  }



  return (
  <div className="appContainer">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>

      <div className="Calander">
        <ReactCalendar onChange={onChange} value={dateState} tileContent={tileContent} calendarType={"US"} />
      </div>

      <div className="Events">
        <Header onAdd={() => setshowAddEvent(!showAddEvent)} showAdd={showAddEvent} />
        {showAddEvent && 
          <form className='add-form' onSubmit={onSubmit} >
            <div className='form-control'>
                <label>Event</label>
                <input type='text' placeholder='Add Event' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            
            <div className="Date" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 5 }}>
              <div className='form-control'>
                  <label>Month</label>
                  <input type="text" pattern="[0-9]*" placeholder='MM' value={month} onChange={(e) => setMonth(e.target.value)} />
              </div>
              
              <div className='form-control'>
                  <label>Day</label>
                  <input type="text" pattern="[0-9]*"  placeholder='DD' value={day} onChange={(e) => setDay(e.target.value)} />
              </div>
              
              <div className='form-control'>
                  <label>Year</label>
                  <input type="text" pattern="[0-9]*"  placeholder='YYYY' value={year} onChange={(e) => setYear(e.target.value)} />
              </div>
            </div>
            <input type='submit' value='Save Event' className='btn btn-block' />
          </form>

        }
        <EventList events={events} onDelete={deleteEvent} onToggle={toggleReminder} />
      </div>
    </div>
  </div>
  );
}

export default HomePage;
