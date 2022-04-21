import {FaTimes} from 'react-icons/fa'

const Event = ({event, onDelete, onToggle}) => {
    return (
        <div className={ `event ${event.reminder ? 'reminder' : ''}` } onDoubeClick={() => onToggle(event.id)}>
            <h3>
                {event.text} 
                <FaTimes style={{color: 'red', cursor: 'pointer'}} 
                onClick={() => onDelete(event.id)} />
            </h3>
            <p>{event.month+"/"+event.day+"/"+event.year}</p>
            
        </div>
    )
}

export default Event
