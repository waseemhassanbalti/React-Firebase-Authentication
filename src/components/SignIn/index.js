import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Row, Card, Input, CardTitle, Label, CardBody, FormGroup, Button, Alert, UncontrolledAlert } from 'reactstrap';
import { Formik, Form, Field } from "formik";
import { Colxx } from '../Common/CustomBootstrap';
import * as Yup from "yup";
//import IntlMessages from '../../helper/IntlMessages';
import FormikCustomWithTopLabels from '../../testForm';
 
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 

const validationFields = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  password: Yup.string().required("Password is required!")
});



const SignInPage = () => (
  <div>
    <SignInForm />
   {
   // <SignUpLink />
   }
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: ''
};
   
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    //this.state = { ...INITIAL_STATE };
    this.state = {
      visible: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (values) => {
    
    this.setState(values);
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
       // this.setState( {error} );
       this.setState({ visible: true });
       
      });

  };
 
  /*onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };*/
  onDismiss =()=> {
    this.setState({ visible: false });
  }
  render() {
  //  const { email, password, error } = this.state;
 
  //  const isInvalid = password === '' || email === '';
 
    return (
     /* <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
 
        {error && <p>{error.message}</p>}
    </form> */
    
    <Row className="mb-4 justify-content-center">
          <Colxx xxs="6">
            <Card>
              <CardBody>
              <h3 className="mb-4">Signin</h3>
          
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
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
                        <Label>
                          Email
                        </Label>
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
                        <Label>
                          Password
                        </Label>
                        <Field
                          className="form-control"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                        {errors.password && touched.password ? (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        ) : null}
                      </FormGroup>

                      <Alert
                      color="warning"
                      className="rounded"
                      isOpen={this.state.visible}
                      toggle={this.onDismiss}
                      >
                        Invalid Email and Password
                      </Alert>
                          <Label >
                            <PasswordForgetLink />
                          </Label>
                          <Button color="primary" type="submit" className="btn float-right" >
                            Sign in 
                          </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
            
          </Colxx>
        </Row>
    );
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };