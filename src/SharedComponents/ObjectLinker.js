import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function ObjectLinker (props) {
    const {user} = useContext(UserContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const path = window.location.pathname.split('/'); 
    const collectionName = path[1];
    const fieldName = collectionName.toLowerCase();
    const documentId = path[2];

    if(user.data[fieldName][documentId])
        setError("User already has document!");

    const docRef = doc(db, collectionName, documentId);

    const getDocument = async () => {
        const document = await getDoc(docRef);

        if(document.exists()) {
            const confirm = await updateDoc(doc(db, "Users", user.uid), {
                [fieldName]: arrayUnion(docRef),
            });

            console.log(confirm);
            //if successfully added:
            navigate('/');
            //TODO: error handle?
        } else {
            setError("Document does not exist");
        }
    };

    useEffect(() => {
        getDocument();
    });

    return (
        <div>
            <h1>You will be redirected shortly...</h1>
            {error && 
                <h1>{error}</h1>
            }
        </div>
    );
}

export default ObjectLinker;