import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
//const Navigation = ({ authUser }) => (
//    <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
//  );

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? ( <NavigationAuth  authUser={authUser} /> ) :( <NavigationNonAuth />)
      }
      {//authUser=> <NavigationAuth authUser={authUser}/> 
      }
    </AuthUserContext.Consumer>
  </div>
);
   
  const NavigationAuth = ({ authUser }) => (
   

    <nav className="nav-wrapper grey darken-3">
      <div className="container"> 
      <Link to={ROUTES.HOME} className="brand-logo" >Rising Sun </Link> 
      <ul className="right">
    {/*  <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>*/}
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      
      {/*!!authUser.roles[ROLES.ADMIN] && (
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )*/}
      <li>
        <SignOutButton />
      </li>
    </ul>
      </div>
    </nav>
    
  );
   
     const NavigationNonAuth = () => (
      <div/>
    /*<ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>*/
  );


export default Navigation;