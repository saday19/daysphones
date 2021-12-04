
const AdminLoginForm = (props) => {

  const handleLogin = props.handleLogin;
  const setUsername = props.setUsername;
  const setPassword = props.setPassword;

  return (
    <div className = 'admin-form-wrapper'>
      <form className = 'admin-form'>
        <input className = 'admin-input-field' placeholder = 'Username' type = 'text' onChange = {(event) => {
          setUsername(event.target.value);
        }} />
        <br />
        <input className = 'admin-input-field' placeholder = 'Password' type = 'password' onChange = {(event) => {
          setPassword(event.target.value);
        }} />
        <br />
        <div onClick = {() => {
          handleLogin()
        }} className = 'admin-submit admin-input-field'>Sign In</div>
      </form>
    </div>
  );
}

export default AdminLoginForm;
