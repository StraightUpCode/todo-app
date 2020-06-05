import React , {Suspense, useContext, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import UserContext from './context/UserContext'
import {useHistory} from 'react-router-dom'
//import LoginPage from './pages/Login'

const TodoPage = React.lazy(()=> import('./pages/TodoPage'))
const LoginPage = React.lazy(()=> import('./pages/Login'))

function App() {
  const [user, setUser] = useState()
  const history = useHistory()
  console.log(history)
  const logInUser = user => {
    console.log("Log in")
    setUser(user)
    history.push('/')
  }

  const logOutUser = x => {
    setUser()
    history.push('/')
  }
  
  return (
    <UserContext.Provider value={
      {
        user : user,
      logInUser: logInUser,
      logOutUser: logOutUser
    }
    }>
      <Switch>
      <Route exact path="/" >
          {user ?  <TodoPage/> : <Redirect to="/login" /> }
        </Route>
      <Route exact path="/login">
          <LoginPage/>
        </Route>

      </Switch>

    </UserContext.Provider >
  );
}


export default App;
