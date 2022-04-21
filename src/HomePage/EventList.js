import "./EventList.css";
import Event from './Event'

const EventList = ({events, onDelete, onToggle}) => {
    return (
        <>
            {events.map( 
                (event) => ( <Event key={event.id} event={event} onDelete={onDelete} onToggle={onToggle} /> )
            )}
        </>
    )
}

export default EventList
