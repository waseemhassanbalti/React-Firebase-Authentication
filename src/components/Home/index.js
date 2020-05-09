import React from 'react';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';
import { withAuthorization } from '../Session';
import SignUpPage from '../SignUp';
import AdminPage from '../Admin'

 
const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <AuthUserContext.Consumer>
      {authUser =>
      authUser.roles === "Admin" ? ( <div> <SignUpPage/> <AdminPage /> </div>   ) :(<div/> )
      }
      </AuthUserContext.Consumer>
  </div>
);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);

//export default HomePage;