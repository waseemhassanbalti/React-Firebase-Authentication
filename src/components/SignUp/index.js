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

import { Row, Card, Input, CardTitle, Label, CardBody, FormGroup, Button, Alert, UncontrolledAlert } from 'reactstrap';
import {FormikReactSelect} from './FormikFields';
import { Formik, Form, Field } from "formik";
import { Colxx } from '../Common/CustomBootstrap';
import * as Yup from "yup";

const validationFields = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  username: Yup.string()
    .required("Username is required!"),
  password1: Yup.string()
    .required("Password is required!"),
  password2: Yup.string().oneOf([Yup.ref('password1'), null], 'Passwords must match')
    .required("Confirm Password is required!"),
  roles: Yup.string()
    .required("Should Select any user role"),
  contactNo: Yup.string()
  .required("Contact No is required!")
});

const options = [
  { value: "Admin", label: "Admin" },
  { value: "Guest", label: "Guest"}
];

const SignUpPage = () => (
    <div>
      <SignUpForm />
    </div>
  );

  const INITIAL_STATE = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    roles:'',
    contactNo: '',
    
  };    
 

  class SignUpFormBase extends Component {
    
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
      this.state = {
        visible: false,
        errormsg:null
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit = (values, {resetForm}) => {
      
     // this.setState(values);
     // const { email, password } = this.state;
     console.log(values )

     const { username, email, password1,contactNo } = values;
     const roles = values.roles.value
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, password1)
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
          resetForm({ ...INITIAL_STATE })
          this.setState( {errormsg:"User Registered Successfully !"} );
          this.setState({visible:true})
        })
        .catch(error => {
          console.log(error.message)
          this.setState( {errormsg:error.message} );
          this.setState({visible:true})
        });
        
    };
   

  /*  onSubmit = event => {
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
          this.setState({visible:true})
        });
   
      event.preventDefault();
    };
    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    
    onChangeDropDown = event =>{
      this.setState({ [event.target.name]: event.target.value });
    }*/

    onDismiss =()=> {
      this.setState({ visible: false });
    }

    render() {
          return (
           /* <form onSubmit={this.onSubmit}>
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
              </form>*/

              <Row className="mb-4 justify-content-center">
          <Colxx xxs="12">
                <Formik
                  initialValues={{
                    username:"",
                    email: "",
                    password1:"",
                    password2:"",
                    roles:"",
                    contactNo:""

                  }}
                  validationSchema={validationFields}
                  onSubmit={this.handleSubmit}
                  >
                  {({
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    isSubmitting
                  }) => (
                    <Form className="av-tooltip tooltip-label-bottom">

                      <FormGroup className="form-group has-top-label">
                        
                        <Field 
                          className="form-control" 
                          name="username"
                          placeholder="User Name" 
                        />
                        {errors.username && touched.username ? (
                          <div className="invalid-feedback d-block">
                            {errors.username}
                          </div>
                        ) : null}
                      </FormGroup>


                      <FormGroup className="form-group has-top-label">
                        
                        <Field 
                          className="form-control" 
                          name="email" 
                          placeholder="Email Address"
                        />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        ) : null}
                      </FormGroup>
                      
                      <FormGroup className="form-group has-top-label">
                        
                        <Field
                          className="form-control"
                          name="password1"
                          type="password"
                          placeholder="Password"
                        />
                        {errors.password1 && touched.password1 ? (
                          <div className="invalid-feedback d-block">
                            {errors.password1}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-top-label">
                        
                        <Field
                          className="form-control"
                          name="password2"
                          type="password"
                          placeholder="Confirm Password"
                        />
                        {errors.password2 && touched.password2 ? (
                          <div className="invalid-feedback d-block">
                            {errors.password2}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label">
                        
                        <FormikReactSelect
                          name="roles"
                          id="roles"
                          value={values.roles}
                          options={options}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                         {errors.roles && touched.roles ? (
                          <div className="invalid-feedback d-block">
                            {errors.roles}
                          </div>
                        ) : null}
                      </FormGroup>


                      <FormGroup className="form-group has-top-label">
                       
                        <Field 
                          className="form-control" 
                          name="contactNo" 
                          type="number"
                          placeholder="Contact No"
                        />
                        {errors.contactNo && touched.contactNo ? (
                          <div className="invalid-feedback d-block">
                            {errors.contactNo}
                          </div>
                        ) : null}
                      </FormGroup>

                      <Alert
                      color="warning"
                      className="rounded"
                      isOpen={this.state.visible}
                      toggle={this.onDismiss}
                      >
                        {this.state.errormsg}
                      </Alert>
                          <Button color="primary" type="submit" className="btn float-right" >
                            Register
                          </Button>
                    </Form>
                  )}
                </Formik>
          </Colxx>
        </Row>


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

