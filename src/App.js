import { useState, useEffect, useContext } from 'react';
import { 
    collection, 
    getDoc,
    getDocs,
} from 'firebase/firestore';
import { db } from './firebase'
import Header from './SharedComponents/Header'
import NavBar from './SharedComponents/NavBar';
import ClassPage from './ClassPage';
import HomePage from './HomePage';
import UserContext from './SharedComponents/UserContext';

function App() {
    const [tab, setTab] = useState("Home");
    const [classes, setClasses] = useState([]);
    const [channel, setChannel] = useState(null);
    const {user} = useContext(UserContext);

    useEffect(() => {
        let getClasses = async () => {
            let courses = [];

            for(const course of user.data.courses) {
                const doc = await getDoc(course);
                const data = doc.data();
                data.id = doc.id;
                
                const query = collection(db, "Courses", data.id, "Channels");
                const channelSnapshot = await getDocs(query);

                data.channels = channelSnapshot.docs.map(doc => {
                    const data = doc.data();
                    data.id = doc.id;
                    return data;
                });

                courses.push(data);
            }
            
            setClasses(courses);
        }
            
        getClasses();
    }, []);

    return (        
        <div className='app-page'>
            <Header subheader={ tab }/>
            <div className='columns is-mobile app-body'>
                <NavBar classes={ classes }
                        setClasses={ setClasses }
                        setTab={ setTab }
                        setChannel={ setChannel }
                        currentPage={ tab } />
                <div className='column'>
                    { tab === "Home" ? 
                        <HomePage /> 
                        : 
                        <ClassPage class={ classes.find(c => c.name === tab) }
                                   channel={ channel } /> 
                    }
                </div>
            </div>
        </div>
    );
}

export default App;