import { useContext, useEffect, useRef, useState } from "react";
import { db } from '../firebase'; 
import { collection, query, onSnapshot, doc, addDoc, orderBy, limit } from 'firebase/firestore';
import UserContext from "../SharedComponents/UserContext";
import './Channel.css';

const dateString = (date) => {
    return date.getUTCFullYear() + "/" +
        ("0" + (date.getUTCMonth()+1)).slice(-2) + "/" +
        ("0" + date.getUTCDate()).slice(-2) + " " +
        ("0" + date.getUTCHours()).slice(-2) + ":" +
        ("0" + date.getUTCMinutes()).slice(-2) + ":" +
        ("0" + date.getUTCSeconds()).slice(-2);
}

function Channel(props) {
    const [messages, setMessages] = useState([]);
    const {user} = useContext(UserContext);
    const scrollTo = useRef(null);

    const messageCollection = collection(db, "Courses", props.class.id, "Channels", props.channel.id, "Messages");

    const handleSubmit = (e) => {
        e.preventDefault();

        const message = e.target.msg.value;
        e.target.msg.value = "";

        addDoc(messageCollection, {
            text: message,
            date: new Date(),
            userName: `${user.data.fname} ${user.data.lname}`,
            userRef: doc(db, "Users", user.uid),
        });
    }

    const copylink = () => {
        navigator.clipboard.writeText(window.location + "Courses/" + props.class.id);;
    }

    useEffect(() => {
        const unsub = onSnapshot(query(messageCollection, orderBy("date"), limit(25)), (snapshot) => {
            const msgs = snapshot.docs.map(doc => doc.data());
            setMessages(msgs);
        });

        return unsub;
    }, [props.channel]);

    useEffect(() => {
        const msgList = document.getElementById("messageList");
        msgList.scrollTo(0, scrollTo.current.offsetTop);
    });

    return (
        <div className="channel-body">
            <div className="channel-header level is-mobile mb-0">
                <div className="level-left">
                    <h1 className="level-item m-2 mr-5 title is-4">{ props.channel.name }</h1>
                </div>
                
                <div className="level-right">
                    <h6 className="level-item m-2 subtitle is-6">
                        <a className="logout" onClick={ copylink }>Copy Class Invite Link!</a>
                    </h6>
                </div>
            </div>
            <div className="message-list" id="messageList">
                <ul>
                    {messages.map((message, idx) =>
                        <li key={ idx } className="msg">
                            <p>
                                <span className="msg-name">{ message.userName }</span>&nbsp;
                                <span className="msg-date">{ dateString(message.date.toDate()) }</span>
                            </p>
                            <p className="msg-text">{ message.text }</p>
                        </li>
                    )}
                    <li ref={scrollTo}></li>
                </ul>
            </div>
            <form id="messageForm" className="message-form" onSubmit={ handleSubmit }>
                <div className="level is-mobile mb-0">
                    <input name="msg" className="level-item input" type="text"></input>
                    <input className="level-item button is-primary" type="submit"></input>
                </div>
            </form>
        </div>
    )
}

export default Channel;