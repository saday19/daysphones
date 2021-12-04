import {useState} from 'react';
import axios from 'axios';
import './styles/admin.css';
import Cookies from 'universal-cookie';
import AdminLoginForm from './AdminLoginForm.js';
import AdminPanel from './AdminPanel.js';

const Admin = () => {

  const [loading, setLoading] = useState(true);

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const cookies = new Cookies();

  const login_data = {
    username: username,
    password: password
  }

  const handleLogin = () => {
    axios.post('/api/login', login_data)
    .then((res) => {
      if(res.data.loginSuccess) {
        setLoggedIn(true);
        cookies.set('login', res.data);
      }
    })
    .catch((err) => {
      console.log("there was an error logging in");
    })
  }

  const checkLogin = () => {
    if(!loggedIn && loading) {
      if(cookies.get('login')) {
        axios.post('/api/is-logged-in', cookies.get('login'))
        .then((res) => {
          if(res.data.loggedIn) {
            setLoggedIn(true);
          }
        }).then(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  }

  checkLogin();

  return(
    <>
      {!loading && loggedIn && <AdminPanel />}
      {!loading && !loggedIn && <AdminLoginForm handleLogin = {handleLogin} setUsername = {setUsername} setPassword = {setPassword}/>}
    </>
  );

}

export default Admin
