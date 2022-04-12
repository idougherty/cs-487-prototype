import './NavBar.css';

function NavBar(props) {
  return (
    <aside className='menu column is-narrow-widescreen'>
      <p className='menu-label'>Classes</p>
      <ul className="menu-list">
        <li><a href='/'>Home</a></li>
        {props.classes.map((className, idx) =>
          <li key={ idx }>
            <a href={ '/'+className }>{ className }</a>
          </li>
        )}
      </ul>
    </aside>
  );
}

export default NavBar;
