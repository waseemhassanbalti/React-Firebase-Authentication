import React from 'react'
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { Row, FormGroup, Button, Alert } from 'reactstrap';
import {FormikReactSelect} from '../SignUp/FormikFields';
import { Formik, Form, Field } from "formik";
import { Colxx } from '../Common/CustomBootstrap';
import * as Yup from "yup";

const validationFields = Yup.object().shape({
    username: Yup.string()
      .required("Username is required!"),
    roles: Yup.string()
      .required("Should Select any user role"),
    contactNo: Yup.string()
    .required("Contact No is required!")
  });
  
  const options = [
    { value: "Admin", label: "Admin" },
    { value: "Guest", label: "Guest"}
  ];

class EditWebUserModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            email:"",
            roles:"",
            contactNo:""
        }
        this.state={...this.props.user}
        this.state = {
            visible: false,
            errormsg:null
          };
        console.log(this.state.user)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onDismiss =()=> {
        this.setState({ visible: false });
      }


      handleSubmit = (values) => {
      
        // this.setState(values);
        // const { email, password } = this.state;
        console.log("Values dekho jee :" + values.uid )
   
        const { username, contactNo } = values;
        const roles = values.roles.value
        try{
         this.props.firebase
               .user(values.uid)
               .update({
                 username,
                 roles,
                 contactNo,
               });
               this.setState( {errormsg:"User Updated Successfully !"} );
               this.setState({visible:true})
            }catch(e){
               
                console.log(e.message)
                this.setState( {errormsg:"You must have to define any user role !"} );
                this.setState({visible:true})
              }
           
       };
    
    render(){

        return(
        
            <Row className="mb-4 justify-content-center">
            <Colxx xxs="12">
                  <Formik
                    enableReinitialize={true}
                    initialValues={this.props.user}
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
  
                        <FormGroup className="form-group has-float-label">
                          
                          <FormikReactSelect
                            name="roles"
                            id="roles"
                            value={values.roles}
                            setFieldValue = {values.roles}
                            options={options}
                            onChange={setFieldValue}
                            
                            onBlur={setFieldTouched}
                            setFieldValue={values.roles}
                            
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
                              Save
                            </Button>
                      </Form>
                    )}
                  </Formik>
            </Colxx>
          </Row>
        );
    }
}

export default compose(withFirebase)(EditWebUserModal);