import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import NavbarComponent from './components/NavBarComponent';

function App() {
  
  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as User);
  
  return (
    
    <>
      <Router>

        <AppBar color="primary" position="fixed">
          <Toolbar>
            <Typography>
                <NavbarComponent authUser={authUser}/>
            </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route></Route>          

        </Switch>
      </Router>
    </>
  );
}

export default App;
