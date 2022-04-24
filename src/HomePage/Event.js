import { useState } from 'react';
import {FaTimes, FaClipboard, FaClipboardCheck} from 'react-icons/fa'

const Event = ({event, onDelete, onToggle}) => {
    const [copied, setCopied] = useState(false);

    const copylink = () => {
        navigator.clipboard.writeText(window.location + "Events/" + event.id);
        setCopied(true);
    }

    const copyButton = copied ? 
                        <FaClipboardCheck style={{color: 'grey', cursor: 'pointer'}} 
                            onClick={copylink} />
                                :
                        <FaClipboard style={{color: 'grey', cursor: 'pointer'}} 
                            onClick={copylink} />;

    return (
        <div className={ `event ${event.reminder ? 'reminder' : ''}` } onDoubleClick={() => onToggle(event.id)}>
            <h3>
                {event.text} 
                <FaTimes style={{color: 'red', cursor: 'pointer'}} 
                    onClick={() => onDelete(event.id)} />
            </h3>
            <p>
                {copyButton}&nbsp;
                {event.month+"/"+event.day+"/"+event.year}
            </p>
            
        </div>
    )
}

export default Event
