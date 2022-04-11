import "./Header.css";

function Header(props) {
    return (
        <div>
            <h1>Class Connect</h1>
            <h2>{ props.subheader }</h2>
        </div>
    )
}

export default Header;