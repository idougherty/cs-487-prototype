import { useContext } from "react";
import AuthContext from "./AuthContext";
import { signOut } from "firebase/auth";
import "./Header.css";

function Header(props) {
    const {auth, setAuth} = useContext(AuthContext);

    const handleLogout = () => {
        signOut(auth).then(() => {
            setAuth([false, auth]);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }

    return (
        <div className="page-header level is-mobile mb-0">
            <div className="level-left">
                <h1 className="level-item m-2 mr-5 title is-2">Class Connect</h1>
                <h2 className="level-item m-2 subtitle is-3">{ props.subheader }</h2>
            </div>
            
            <div className="level-right">
                <h6 className="level-item m-2 subtitle is-6">{ auth.currentUser.email }</h6>
                <h6 className="level-item m-2 subtitle is-6">
                    <a className="logout" onClick={ handleLogout }>logout</a>
                </h6>
            </div>
        </div>
    )
}

export default Header;