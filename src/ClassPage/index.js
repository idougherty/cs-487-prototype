import Channel from './Channel'; 

function ClassPage(props) {
  return (
    <div className='app-content'>
      <Channel class={ props.class } channel={ props.channel } />
    </div>
  );
}

export default ClassPage;
