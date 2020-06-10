import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
 
const AccountPage = () => (
    <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h3><strong>{authUser.username}</strong></h3>
        <h5>{authUser.email}</h5>
        <PasswordForgetForm/>
      </div>
    )}
  </AuthUserContext.Consumer>
);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage);