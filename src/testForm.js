import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle
} from "reactstrap";
import { Colxx } from '../src/components/Common/CustomBootstrap';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  password: Yup.string().required("Password is required!"),
  tags: Yup.array()
    .min(3, "Pick at least 3 tags")
    .required("At least one tag is required"),
  date: Yup.date()
    .nullable()
    .required("Date required"),
  state: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
    .nullable()
    .required("State is required!")
});

const options = [
  { value: "food", label: "Food" },
  { value: "beingfabulous", label: "Being Fabulous", disabled: true },
  { value: "reasonml", label: "ReasonML" },
  { value: "unicorns", label: "Unicorns" },
  { value: "kittens", label: "Kittens" }
];

class FormikCustomWithTopLabels extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      state: values.state.value
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  render() {
    return (
      <div>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  top-labels-over-line
                </CardTitle>

                <Formik
                  initialValues={{
                    email: "test@test.com",
                    password: "",
                    tags: [],
                    date: null,
                    state: { value: "reasonml", label: "ReasonML" }
                  }}
                  validationSchema={SignupSchema}
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
                      <FormGroup className="form-group has-float-label">
                        <Label>
                            forms.email
                        </Label>
                        <Field className="form-control" name="email" />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                        forms.password
                        </Label>
                        <Field
                          className="form-control"
                          name="password"
                          type="password"
                        />
                        {errors.password && touched.password ? (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        ) : null}
                      </FormGroup>

                      
                     

                      
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  top-labels-in-input
                </CardTitle>

                <Formik
                  initialValues={{
                    email: "test@test.com",
                    password: "",
                    tags: [],
                    date: null,
                    state: { value: "reasonml", label: "ReasonML" }
                  }}
                  validationSchema={SignupSchema}
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
                          forms.email-u
                        </Label>
                        <Field className="form-control" name="email" />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-top-label">
                        <Label>
                          forms.password-u
                        </Label>
                        <Field
                          className="form-control"
                          name="password"
                          type="password"
                        />
                        {errors.password && touched.password ? (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        ) : null}
                      </FormGroup>

                      

                     

                      
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
    );
  }
}
export default FormikCustomWithTopLabels;
