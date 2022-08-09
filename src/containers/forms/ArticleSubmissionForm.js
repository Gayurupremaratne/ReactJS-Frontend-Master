import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardHeader,
  FormText,
  Label,
  Row,
  Col
} from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import axios from "axios";
import moment from "moment";
import "moment-timezone";
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import './../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Editor } from "@tinymce/tinymce-react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

import {
  addArticles,
  uploadArticle,
  updateArticle
} from "../../actions/Advertiserarticles";
import { height } from "@material-ui/system";
import { stat } from "fs";

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_file: null,
      loaded: 0,
      submitting: this.props.processing,
      publish_date: new Date(),
      fileName: "Choose a file ..."
    };
  }

  componentDidMount() {
    const {
      location: { state }
    } = this.props;
    this.state.article_id = state.id;
  }

  onSubmit(values) {
    // console.log('values', values);
    const f_data = new FormData();
    var pubday = moment(this.state.publish_date).format("YYYY-MM-DD");
    var today = moment(new Date()).format("YYYY-MM-DD");
    let err = "";
    if (pubday === today) {
      err = "Please select a valid date\n";
      toastr.error("Error", err);
    
    } else {
      if (this.state.selected_file == null) {
        err = "Please upload a valid file.\n";
        toastr.error("Error", err);
      } else {
        f_data.append(
          "file",
          this.state.selected_file,
          this.state.selected_file.name
        );
        f_data.append("publish_date", pubday);
        f_data.append("status", 5);
        f_data.append("title", values.title);
        this.props.updateArticle(f_data, this.state.article_id);
        this.timer = setInterval(() => {
         window.location.href = "/dashboard";
        }, 1000);
      }
    }
  }

  handleFileChange = event => {
    let files = event.target.files[0];
    console.log(files.name);
    // toastr.success("Success", files.name);
    if (this.checkMimeType(event)) {
      this.setState({
        selected_file: event.target.files[0],
        loaded: 0
      });
    }
  };

  checkMimeType = event => {
    let files = event.target.files[0];
    let err = "";
    let size = event.target.files[0].size;
    const types = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (types.every(type => files.type !== type)) {
      err = "This file format is not supported\n";
      toastr.error("Error", err);
    }

    if (size > 2000000) {
      err = "File size should be less than 2MB\n";
      toastr.error("Error", err);
    }
    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      return false;
    }

    return true;
  };

  handleChange = (event, input) => {
    var todayObj = new Date();
    var today = moment(
      todayObj.getFullYear() +
        "-" +
        (todayObj.getMonth() + 1) +
        "-" +
        todayObj.getDate()
    ).format("YYYY/MM/DD");
    var selectedDay = moment(event).format("YYYY/MM/DD");
    let err = "";
    if (today >= selectedDay) {
      err = "Please select a future date\n";
      toastr.error("Error", err);
    } else if (today < selectedDay) {
      this.setState({
        publish_date: event
      });
    }
  };

  renderFileInput = field => {
    const {
      meta: { touched, error }
    } = field;

    return (
      <div>
        <label htmlFor="fileupload">{field.label}</label>

        <div className="custom-file">
          <input
            type="file"
            className=""
            name="fileupload"
            onChange={event => this.handleFileChange(event, field.input)}
          />
          {/* <label className="" for="validatedCustomFile">
            {this.state.fileName}
          </label> */}
          {touched && error && <FormText color="danger">{error}</FormText>}
        </div>
      </div>
    );
  };

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    console.log("textFeild", field);
    return (
      <div>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type || "text"}
          {...field.input}
        />
        <div className="text-help" color="danger">
          {touched && error && <FormText color="danger">{error}</FormText>}
        </div>
      </div>
    );
  }

  render() {
    const {
      handleSubmit,
      submitting,
      location: { state }
    } = this.props;
    return (
      <Card className="mt-4 border">
        <CardHeader>
          <h5 className="mb-0">Upload Article</h5>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <FormGroup>
              <Field
                component={this.renderField}
                type="text"
                label="Title"
                name="title"
              />
              <input type="hidden" value={state.id} name="id" />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup className="mb-3">
                  <Label>Date to be published</Label>
                  <div>
                    <DatePicker
                      className="form-control"
                      dateFormat="yyyy-MM-dd"
                      selected={this.state.publish_date}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3">
                  <Field
                    label="Upload File"
                    name="fileupload"
                    type="file"
                    component={this.renderFileInput}
                    className="form-control"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className="mb-3 text-right">
              <Button
                type="submit"
                color="success"
                style={{ marginTop: "10px" }}
                size="lg"
              >
                Upload
              </Button>
              <Link
                to="/dashboard"
                className="btn btn-primary btn-lg"
                style={{ marginLeft: "10px", marginTop: "10px" }}
              >
                Skip
              </Link>
              {/* <Button color="success" disabled={ting} type="submit" onSubmit={addArticles} style={{ float: "right", marginTop: "10px" }}>Submit</Button>{" "} */}
              {/* <Button color="danger" style={{ marginTop: "10px", marginRight: "10px" }}>Discard</Button>{" "} */}
            </FormGroup>
          </form>
        </CardBody>
      </Card>
    );
  }
}

function validate(values) {
  const errors = {};
  console.log("validate");
  console.log(values);
  if (!values.title) {
    errors.title = "Please enter the title";
  }
  // if (!values.fileupload) {
  //     errors.fileupload = "Please upload a file";
  // }
  return errors;
}

function mapStateToProps({ processing, SelectedMessage }) {
  return {
    processing,
    SelectedMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addArticles,
      uploadArticle,
      updateArticle
    },
    dispatch
  );
}

let FormData1 = reduxForm({ validate, form: "ArticleForm" })(ArticleForm);
FormData1 = withRouter(connect(mapStateToProps, mapDispatchToProps)(FormData1));
export default FormData1;
