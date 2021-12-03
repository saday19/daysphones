import {useState} from 'react';
import axios from 'axios';
import './styles/admin.css';

const Admin = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login_data = {
    username: username,
    password: password
  }

  const handleLogin = () => {
    axios.post('/api/login', login_data)
    .then((res) => {
      if(res.data.loginSuccess) {
        setLoggedIn(true);
      }
    })
    .catch((err) => {
      console.log("there was an error logging in");
    })
  }

  const isLoggedIn = () => {

  }

  return(
    <>
      {loggedIn && <a>logged in :)</a>}
      <div onSubmit = {handleLogin} className = 'admin-form-wrapper'>
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
    </>
  );

}

export default Admin
