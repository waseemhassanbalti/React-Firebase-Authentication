import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
import { Row, Card, Input, CardTitle, Label, CardBody, FormGroup, Button, Alert, UncontrolledAlert } from 'reactstrap';
import { Formik, Form, Field } from "formik";
import { Colxx } from '../Common/CustomBootstrap';
import * as Yup from "yup";
 
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const validationFields = Yup.object().shape({
  password1: Yup.string()
    .email("Invalid email address")
    .required("Password Required "),
  password2: Yup.string()
    .email("Invalid email address")
    .required("Password Required ")
});

 
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
    
    this.state = {
      visible: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  handleSubmit = (values) => {
    
    this.setState(values);
    const { passwordOne } = this.state;
 
    
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.setState({visible:true});
      })
      .catch(error => {
        this.setState({ error });
      });

  };
  onDismiss =()=> {
    this.setState({ visible: false });
  }
  /*onSubmit = event => {
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
 
    return (
      /*<form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
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
                    password1: "",
                    password2: ""
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
                        We have sent email, Now you can reset your password
                      </Alert>
                      <FormGroup>
                        <Label>
                          New Password
                        </Label>
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
                      <Label>
                          Confirm Password
                        </Label>
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
 
export default withFirebase(PasswordChangeForm);