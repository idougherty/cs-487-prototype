import './NavBar.css';

function NavBar(props) {
  return (
    <div>
      <ul>
        <li><a href='/'>Home</a></li>
        {props.classes.map((className, idx) =>
          <li><a href={ '/'+className }>{ className }</a></li>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
