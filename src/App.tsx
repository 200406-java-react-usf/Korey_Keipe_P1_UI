import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import NavbarComponent from './components/NavBarComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import UserComponent from './components/UserComponent';
import DashboardComponent from './components/DashboardComponent';
import ReimbComponent from './components/ReimbComponent';
import UpdateUserComp from './components/UpdateUserComp';
import UpdateReimbComp from './components/UpdateReimbComp';
import SubmitReimbComp from './components/SubmitReimbComp';
import { Reimb } from './models/reimb';

function App() {
  
  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as User);
  // @ts-ignore
  const [newUser, setNewUser] = useState(null as User);
  // @ts-ignore
  const [newReimb, setNewReimb] = useState(null as Reimb);
  // @ts-ignore
  const [thisUser, setThisUser] = useState(null as User);
  // @ts-ignore
  const [thisReimb, setThisReimb] = useState(null as Reimb);

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
          <Route path="/users" render={() => <UserComponent authUser={authUser} setThisUser={setThisUser} /> } />
          <Route path="/dashboard" render={() => <DashboardComponent authUser={authUser} /> } /> 
          <Route path="/reimbursements" render={() => <ReimbComponent authUser={authUser} setThisReimb={setThisReimb}/> } />
          <Route path="/submit" render={() => <SubmitReimbComp authUser={authUser} setNewReimb={setNewReimb} /> } />
          <Route path={`/user/${thisUser?.user_id}`} render={() => <UpdateUserComp authUser={authUser} thisUser={thisUser} setThisUser={setThisUser} setNewUser={setNewUser} /> } /> 
          <Route path={`/reimbursement/${thisReimb?.id}`} render={() => <UpdateReimbComp authUser={authUser} thisReimb={thisReimb} setNewReimb={setNewReimb} setThisReimb={setThisReimb} /> } />
        </Switch>
      </Router>
    </>
  );
}

export default App;
