import "./EventList.css";
import Event from './Event'

const EventList = ({events, onDelete, onToggle}) => {
    return (
        <>
            {events.map( 
                (event, idx) => ( <Event key={idx} event={event} onDelete={onDelete} onToggle={onToggle} /> )
            )}
        </>
    )
}

export default EventList
