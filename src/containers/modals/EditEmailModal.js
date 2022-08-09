import React, { Component } from "react";
import reduxDialog, { closeDialog, openDialog } from "redux-reactstrap-modal";
import { connect } from "react-redux";
import { compose } from "recompose";
import { bindActionCreators } from "redux";
import EditEmailForm from "../forms/EditEmailForm";



class EditTemplateModal extends Component {
  render() {
    const {data } = this.props;
    return (
      <div className="modal-signin">
        <div className="modal-header">
          <h4 className="modal-title">Update email</h4>
          <button
            type="button"
            className="close"
            onClick={() => this.props.closeDialog("EDIT_TEMPLATE")}
          >
            <span aria-hidden="true">
              <i className="fa fa-times"></i>
            </span>
          </button>
        </div>
        <div className="modal-body">
          <EditEmailForm rowData={data} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeDialog, openDialog }, dispatch);
}
const WithDialog = compose(
  reduxDialog(connect, {
    name: "EDIT_TEMPLATE",
    backdrop: "static",
    centered: true,
    className: "modal-right modal-lg"
  })
)(EditTemplateModal);
const ConnectedWithDialog = connect(null, mapDispatchToProps)(WithDialog);

export default ConnectedWithDialog;
