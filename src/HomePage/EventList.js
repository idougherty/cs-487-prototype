import "./EventList.css";

function EventList(props) {
    return (
        <div className='column is-two-fifths'>
            <h2>Upcoming Events</h2>
            <ul>
                {props.events.map((event, idx) => 
                    <li key={ idx }>
                        { event.class }: { event.title }, { event.date.toDateString() }
                    </li>
                )}
            </ul>
        </div>
    )
}

export default EventList;