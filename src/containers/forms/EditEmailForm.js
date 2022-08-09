import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button } from "reactstrap";
// import { updateTemplate } from '../actions/AccountAction';
// import { VALIDATION,  validateNum, STRING} from '../config/index';
import { openDialog, closeDialog } from "redux-reactstrap-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editPublishers } from "../../actions/publishers";

class EditTemplateForm extends Component {
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <label for={field.name}>{field.label}</label>
        <input
          className="form-control"
          type={field.type || "text"}
          name={field.name}
          {...field.input}
          placeholder={field.placeholder}
        />
        <p className="text-danger">{touched ? error : ""}</p>
      </div>
    );
  }
  onSubmit(values) {
    const { rowData } = this.props;

    this.props.editPublishers(values.email, rowData.data);
  }

  render() {
    const { handleSubmit, rowData } = this.props;
    console.log("rowData", rowData);
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <Field
            value="This is a Sample Template"
            component={this.renderField}
            name="email"
            id="template"
            placeholder="Email address ..."
            label="Enter new email address"
          />
          <div className="text-right">
            <Button color="success" className="mr-2">
              Update
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.template) {
    errors.template = "abc";
  }

  return errors;
}
function mapStateToProps({}) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editPublishers }, dispatch);
}

let editFormData = reduxForm({
  validate,
  form: "EditTemplateForm",
  enableReinitialize: true
})(EditTemplateForm);
editFormData = connect(mapStateToProps, mapDispatchToProps)(editFormData);
export default editFormData;
