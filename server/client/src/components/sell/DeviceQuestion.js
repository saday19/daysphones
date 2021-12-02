
const DeviceQuestion = (props) => {

  return (
    <>
    <div className = 'di-input-header'>
      <h2>{props.question}</h2>
      {props.items.map((item) =>
        <div className = 'di-text di-text-formatting' key = {item} onClick = {() => {
          {props.todo(item)}
        }}><a className = 'di-inner-text'>{item}</a></div>
      )}
    </div>
    </>
  );
}

export default DeviceQuestion
