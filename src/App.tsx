import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import NavbarComponent from './components/NavBarComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import UserComponent from './components/UserComponent';
import { prependOnceListener } from 'cluster';

function App() {
  
  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as User);
  // @ts-ignore
  const [newUser, setNewUser] = useState(null as User);
  const [errorMessage, setErrorMessage] = useState('');
  
  return (
    
    <>
      <Router>

        <AppBar color="primary" position="static">
          <Toolbar>
            <Typography>
                <NavbarComponent authUser={authUser} setAuthUser={setAuthUser}/>
            </Typography>
          </Toolbar>
        </AppBar>

        { !authUser ? <Redirect to="/login" /> : <></> }

        <Switch>
          <Route path="/home" render={() => <HomeComponent authUser={authUser} setAuthUser={setAuthUser} /> } />          
          <Route path="/login" render={() => <LoginComponent authUser={authUser} setAuthUser={setAuthUser} errorMessage={errorMessage} /> } />          
          <Route path="/register" render={() => <RegisterComponent authUser={authUser} setNewUser={setNewUser} errorMessage={errorMessage} /> } /> 
          <Route path="/users" render={() => <UserComponent authUser={authUser} /> } />        
        </Switch>
      </Router>
    </>
  );
}

export default App;
