import './ChatList.css';

function ChatList(props) {
    return (
        <aside className='chat-list menu column is-narrow'>
            <p className='menu-label'>Channels</p>
            <ul className="menu-list">
                {props.chats.map((chat, idx) =>
                    <li key={ idx }>
                        <a>{ chat.name }</a>
                    </li>
                )}
            </ul>
        </aside>
    )
}

export default ChatList;