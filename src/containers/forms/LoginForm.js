import React, { Component } from "react";

import {
  Button,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormText,
  FormGroup
} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../../actions/index";
import {uiApicall} from "../../actions/index";

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const tooOld = value =>
  value && value > 65 ? "You might be too old for this" : undefined;
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: this.props.processing,
      error_msg: ""
    };
  }
componentDidMount(){
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("publisher name:");
}
  onSubmit(values) {
    this.props.login(values);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.user != null) {
      const err = nextProps.user.message && nextProps.user.message;
      this.setState({ error_msg: err });
    }

    if (nextProps.user != null) {
      const data = nextProps.user.data && nextProps.user.data;
      if (data != null) {
        this.props.uiApicall();
        window.location.href = "/dashboard";
      }
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const { login } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <p className="text-muted">Sign In to your account</p>
        <FormText color="danger">{this.state.error_msg}</FormText>
        <Field
          component={renderField}
          icon="fa fa-user"
          type="text"
          label="Username"
          name="username"
          validate={email}
          warn={aol}
        />
        <Field
          component={renderField}
          icon="fa fa-key"
          type="password"
          label="Password"
          name="password"
        />
        <Row>
          <Col xs="6">
            <Button
              color="primary"
              disabled={submitting}
              type="submit"
              onSubmit={login}
            >
              Login
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}
const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Please enter the username";
  }
  if (!values.password) {
    errors.password = "Please enter the Password";
  }
  return errors;
};   

const renderField = ({
  input,
  label,
  type,
  icon,
  meta: { touched, error }
}) => (
  <FormGroup className="mb-3">
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className={icon}></i>
        </InputGroupText>
      </InputGroupAddon>
      <Input {...input} type={type} placeholder={label} />
      <br />
    </InputGroup>
    {touched && (error && <FormText color="danger">{error}</FormText>)}
  </FormGroup>
);

function mapStateToProps({ processing, user }) {
  return {
    processing,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login,
      uiApicall
    },
    dispatch
  );
}

let LoginFormData = reduxForm({ validate, form: "LoginForm" })(LoginForm);
LoginFormData = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormData);
export default LoginFormData;
