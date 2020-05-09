import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
//import {Link} from 'react-router-dom';
//import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';
import AdminPage from '../Admin'
import {withAuthorization } from '../Session';


const SignUpPage = () => (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );

  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    roles:'Guest',
    contactNo: '',
    error: null,
  };    
 
  class SignUpFormBase extends Component {
    
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
      const { username, email, passwordOne,contactNo,roles } = this.state;
 
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          // Create a user in your Firebase realtime database
          return this.props.firebase
            .user(authUser.user.uid)
            .set({
              username,
              email,
              roles,
              contactNo,
            });
        })
        .then(authUser => {
          //event.preventDefault();
          this.setState({ ...INITIAL_STATE });
          //this.props.history.push(ROUTES.HOME);
          this.props.firebase.doSignOut2();
        })
        .catch(error => {
          this.setState({ error });
        });
   
      event.preventDefault();
    };
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    
    onChangeDropDown = event =>{
      this.setState({ [event.target.name]: event.target.value });
    }
    
    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            roles,
            contactNo,
            error,
          } = this.state;

          const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
       
          return (
            <form onSubmit={this.onSubmit}>
              <input
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
              />
              <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
              <input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
              <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              />
              <label>
                User Role:
                <select name="roles" value = {roles} onChange={this.onChangeDropDown} >
                  <option value="Guest" >Guest</option>
                  <option value="Admin">Admin</option>
              </select>
              </label>


              <input
                name="contactNo"
                value={contactNo}
                onChange={this.onChange}
                type="number"
                placeholder="Contact No"
              />

              <button disabled={isInvalid} type="submit">
                  Sign Up
               </button>
       
              {error && <p>{error.message}</p>}
              </form>
            );
        }
  }
   
  /*const SignUpLink = () => (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );*/
   
  //const SignUpForm = withFirebase(SignUpFormBase);
  
const condition = authUser =>
authUser && authUser.roles==="Admin";

  const SignUpForm = compose(
    withAuthorization(condition),
    withRouter,
    withFirebase,
  )(SignUpFormBase);
  export default SignUpPage;
  export { SignUpForm};

