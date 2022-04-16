import './NavBar.css';

function NavBar(props) {
  return (
    <aside className='menu column is-narrow'>
      <p className='menu-label'>Classes</p>
      <ul className="menu-list">
        <li><a href='/'>Home</a></li>
        {props.classes.map((clss, idx) =>
          <li key={ idx }>
            <a href={ '/'+clss.name }
                className={(props.currentClass == clss.name) ? "is-active" : ""}>
                  { clss.name }
            </a>
            {
              (props.currentClass == clss.name) && 
              <ul>
                {clss.channels.map((channel, idx) =>
                  <li key={ idx }>
                    <a href={'#'+channel.name}>{ channel.name }</a>
                  </li>
                )}
              </ul>
            }
          </li>
        )}
      </ul>
    </aside>
  );
}

export default NavBar;
