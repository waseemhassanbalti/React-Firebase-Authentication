import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "../../assets/css/vendor/bootstrap.rtl.only.min.css";
import '../../assets/css/vendor/bootstrap.min.css'
//import '../../assets/scss/theme.scss'

import { withFirebase } from '../Firebase';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import Logout from '../SignOut'
import AdminPage from '../Admin';
import Sidebar from '../Layout/Sidebar';
import AppLayout from '../Layout'

import * as ROUTES from '../../constants/routes';
//import { AuthUserContext } from '../Session';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
        <AppLayout/>
        {/*<Navigation/>
        <Sidebar/>
        */}
       {/*<Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
      */}
      <Route exact path={ROUTES.LANDING} component={SignInPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    </div>
  </Router>

    );
 
 
export default withAuthentication(App);
