import "./Header.css";

function Header(props) {
    return (
        <div className="page-header level-left">
            <h1 className="level-item m-2 mr-5 title is-2">Class Connect</h1>
            <h2 className="level-item m-2 subtitle is-3">{ props.subheader }</h2>
        </div>
    )
}

export default Header;