import { addDoc, updateDoc, arrayUnion, collection, doc, setDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { db } from '../firebase';
import './NavBar.css';
import UserContext from './UserContext';

function NavBar(props) {
  const { user } = useContext(UserContext);
  const [modalType, setModalType] = useState(null);

  const modalClass = modalType ? " is-active" : "";

  const closeModal = () => {
    setModalType(null);
  }

  const createClass = async (name) => {
    const courseRef = doc(collection(db, "Courses"));

    await updateDoc(doc(db, "Users", user.uid), {
        courses: arrayUnion(courseRef),
    });

    const courseData = {
      name: name,
      admins: [user.uid]
    };

    await setDoc(courseRef, courseData);
    
    courseData.id = courseRef.id;
    courseData.channels = [];

    await createChannel(courseData, "General");
    await createChannel(courseData, "Assignments");
    await createChannel(courseData, "Resources");

    return props.classes.concat(courseData);
  };
  
  const createChannel = async (course, name) => {
    const channelRef = doc(collection(db, "Courses", course.id, "Channels"));
    
    const channelData = {
      name: name,
    };

    await setDoc(channelRef, channelData);

    channelData.id = channelRef.id;
    course.channels.push(channelData);
    
    return props.classes;
  };

  const handleSubmit = async () => {
    const name = document.getElementById("name").value;
    document.getElementById("name").value = "";
    let classes = []; 

    if(modalType === "Class") {
      classes = await createClass(name);
    } else {
      const course = props.classes.find(c => c.name === props.currentPage);
      classes = await createChannel(course, name);
    }

    props.setClasses(classes);
    setModalType(null);
  };

  return (
    <aside className='menu column is-narrow'>
      <p className='menu-label'>Classes</p>
      <ul className="menu-list">
        <li><a onClick={ () => props.setTab("Home") }>Home</a></li>
        {props.classes.map((clss, idx) =>
          <li key={ idx }>
            <a onClick={ () => {
                            props.setTab(clss.name)
                            props.setChannel(clss.channels[0])
                       }}
               className={(props.currentPage === clss.name) ? "is-active" : ""}>
                  { clss.name }
            </a>
            {
              (props.currentPage === clss.name) && 
              <ul>
                {clss.channels.map((channel, idx) =>
                  <li key={ idx }>
                    <a onClick={ () => { props.setChannel(channel)} }>
                      { channel.name }  
                    </a>
                  </li>
                )}        
                {
                  (clss.admins.includes(user.uid))  &&
                  <li><button className="button is-primary" onClick={ () => setModalType("Channel") }>+ New Channel</button></li>
                }
              </ul>
            }
          </li>
        )}
        {
          user.data.userType === "teacher"  &&
          <li><button className="button is-primary" onClick={ () => setModalType("Class") }>+ New Class</button></li>
        }
      </ul>
      <div className={"modal" + modalClass}>
        <div onClick={closeModal} className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Create New { modalType }</p>
            <button onClick={closeModal} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <label htmlFor="name">Name of { modalType }:</label> <br/>
            <input type="text" id="name" name="name"/>
          </section>
          <footer className="modal-card-foot">
            <button onClick={handleSubmit} className="button is-success">Create { modalType }</button>
            <button onClick={closeModal} className="button">Cancel</button>
          </footer>
        </div>
      </div>
    </aside>
  );
}

export default NavBar;
