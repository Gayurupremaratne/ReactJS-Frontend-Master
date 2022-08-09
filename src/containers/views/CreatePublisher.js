import React, { Component } from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  FormText,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createpublisher } from "../../actions/publishers";
import Select from "react-select";

const required = value => (value ? undefined : "Required");

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const options = [
  { value: "sports", label: "Sports" },
  { value: "fashion", label: "Fashion" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "finance", label: "Finance" }
];
var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
class CreatePublisher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      fullName: "",
      email1: "",
      email2: "",
      email3: "",
      email4: "",
      email5: "",
      email6: "",
      language: "1",
      isValid: false,
      isNameValid: false
    };
  }
  handleNameChange = event => {
    event.preventDefault();
    this.setState({
      fullName: event.target.value
    });

    if (event.target.value == "") {
      this.setState({ isNameValid: true });
    } else {
      this.setState({ isNameValid: false });
    }
  };

  handleEmail1Change = event => {
    event.preventDefault();
    this.setState({
      email1: event.target.value
    });

    if (event.target.value == "" || !format.test(event.target.value)) {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  };

  handleEmail2Change = event => {
    event.preventDefault();
    this.setState({
      email2: event.target.value
    });
  };
  handleEmail3Change = event => {
    event.preventDefault();
    this.setState({
      email3: event.target.value
    });
  };
  handleEmail4Change = event => {
    event.preventDefault();
    this.setState({
      email4: event.target.value
    });
  };
  handleEmail5Change = event => {
    event.preventDefault();
    this.setState({
      email5: event.target.value
    });
  };
  handleEmail6Change = event => {
    event.preventDefault();
    this.setState({
      email6: event.target.value
    });
  };
  handleLanguageChange = event => {
    event.preventDefault();
    this.setState({
      language: event.target.value
    });
  };

  handleSubmit = event => {
    var email1 = this.state.email1;
    var email2 = this.state.email2;
    var email3 = this.state.email3;
    var email4 = this.state.email4;
    var email5 = this.state.email5;
    var email6 = this.state.email6;

    let email_array = [email1, email2, email3, email4, email5, email6];

    var filtered = email_array.filter(function(el) {
      return el != "";
    });

    const data = {
      name: this.state.fullName,
      email: filtered,
      language_id: this.state.language,
      created_by: "admin",
      created_date: moment().format("YYYY-MM-DD"),
      updated_by: "admin",
      updated_date: moment().format("YYYY-MM-DD"),
      status: 1
    };

    console.log("->", data.name);
    console.log("->", data.language_id);
    console.log("->", data.email);

    this.props.createpublisher(data);
    event.preventDefault();
  };
  componentDidMount() {
    var access_token = localStorage.getItem("access_token");
    if (access_token == null) {
      this.props.history.push("/login");
    }
  }
  componentWillReceiveProps(nextProps) {
    const { createpub } = this.props;
    if (nextProps.createpub !== createpub) {
      window.location.reload();
    }
  }

  render() {
    const { selectedOption } = this.state;

    const cardStyle = {
      marginTop: 25,
      marginLeft: 10
    };

    const renderSaveButton = () => {
      if ((this.state.fullName == "") || (!format.test(this.state.email1))) {
        return (
          <div style={{ display: "inline-block" }}>
            <button className="btn btn-sm btn-success" type="submit" disabled>
              <i className="fa fa-dot-circle-o"></i> Save
            </button>
          </div>
        );
      } else {
        return (
          <div style={{ display: "inline-block" }}>
            <button className="btn btn-sm btn-success" type="submit" >
              <i className="fa fa-dot-circle-o"></i> Save
            </button>
          </div>
        );
      }
    };
    return (
      <Card style={cardStyle}>
        <CardBody>
          <CardTitle>
            <h1>Create new publisher</h1>
          </CardTitle>

          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="publisherName">Publisher Name</Label>
              {this.state.isNameValid ? (
                <FormText
                  color="danger"
                  style={{ marginBottom: 5 }}
                >{`Publisher name can not be empty`}</FormText>
              ) : null}
              <Input
                type="text"
                name="fullName"
                id="publisherName"
                placeholder="publisher name..."
                onChange={this.handleNameChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="publisherLanguage">Publisher Language</Label>
              <Input
                type="select"
                name="language"
                id="publisherLanguage"
                placeholder="publisher language..."
                onChange={this.handleLanguageChange}
                value={this.state.language}
              >
                <option value="1">සිංහල</option>
                <option value="2">English</option>
                <option value="3">தமிழ்</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="publisherName">
                Publisher Email (Maximum 6 emails)
              </Label>
              {this.state.isValid ? (
                <FormText
                  color="danger"
                  style={{ marginBottom: 5 }}
                >{`Invalid email`}</FormText>
              ) : null}
              <Input
                type="email"
                name="email1"
                id="email1"
                placeholder="publisher email..."
                validate={email}
                onChange={this.handleEmail1Change}
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="email"
                name="email2"
                id="email1"
                validate={email}
                placeholder="publisher email..."
                onChange={this.handleEmail2Change}
                validate={email}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email3"
                id="email1"
                validate={email}
                placeholder="publisher email..."
                onChange={this.handleEmail3Change}
                validate={email}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email4"
                id="email1"
                validate={email}
                placeholder="publisher email..."
                onChange={this.handleEmail4Change}
                validate={email}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email5"
                validate={email}
                id="email1"
                placeholder="publisher email..."
                onChange={this.handleEmail5Change}
                validate={email}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email6"
                id="email1"
                validate={email}
                placeholder="publisher email..."
                onChange={this.handleEmail6Change}
                validate={email}
              />
            </FormGroup>

            <div style={{ marginTop: 15 }}>
              {renderSaveButton()}
              <div style={{ display: "inline-block", marginLeft: 10 }}>
                <button className="btn btn-sm btn-danger" type="reset">
                  <i className="fa fa-ban"></i> Reset
                </button>
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps({ user, createpub }) {
  return {
    user,
    createpub
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createpublisher
    },
    dispatch
  );
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreatePublisher)
);
