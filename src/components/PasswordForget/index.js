import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Row, Card, Input, CardTitle, Label, CardBody, FormGroup, Button, Alert, UncontrolledAlert } from 'reactstrap';
import { Formik, Form, Field } from "formik";
import { Colxx } from '../Common/CustomBootstrap';
import * as Yup from "yup";

const validationFields = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!")
});


const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
};
 
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
 
   // this.state = { ...INITIAL_STATE };
    this.state = {
      visible: false,
      errorMsg:null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (values) => {
    
    this.setState(values);
    const { email } = this.state;
 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.setState({visible:true, errorMsg:"We have sent email, Now you can reset your password"});
      })
      .catch(error => {
        this.setState({ visible:true , errorMsg : error.message});
      });

  };
  onDismiss =()=> {
    this.setState({ visible: false });
  }
  /*onSubmit = event => {
    const { email } = this.state;
 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };*/
 
  render() {
    const { email, error } = this.state;
 
    const isInvalid = email === '';
 
    return (
     /* <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
 
        {error && <p>{error.message}</p>}
      </form>*/

      <Row className="mb-4 justify-content-center">
          <Colxx xxs="6">
            <Card>
              <CardBody>
              <h3 className="mb-4">Reset Password</h3>
          
                <Formik
                  initialValues={{
                    email: "",
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

                      <Alert
                      color="warning"
                      className="rounded"
                      isOpen={this.state.visible}
                      toggle={this.onDismiss}
                      >
                        {this.state.errorMsg}
                      </Alert>

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
                
                      <Button color="primary" type="submit">
                           Reset My Password
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
 


const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
 
export default PasswordForgetPage;
 
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
 
export { PasswordForgetForm, PasswordForgetLink };