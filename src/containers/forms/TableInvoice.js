import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Table } from "reactstrap";
// import { getInvoiceById, getInvoiceTotal } from "../../actions/invoice";
import { getInvoiceById } from "../../actions/invoice";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editPublishers } from "../../actions/publishers";
import moment from "moment";
import _ from "lodash";
class TableInvoice extends Component {
  componentDidMount() {
    const { rowData } = this.props;
    if (rowData) {
      this.props.getInvoiceById(rowData.data);
      // this.props.getInvoiceTotal(rowData.data);

      console.log("rowData==============>>", rowData.data);
    }
  }

  render() {
    console.log("jjjkk");
    return (
      <div>
        <div className="invoidContainer">
          <p>
            Invoice ID:{" "}
            {this.props.invoiceById &&
              _.uniqBy(this.props.invoiceById, "invoice_id")[0].invoice_id}
          </p>
          <p>
            Created date:{" "}
            {moment(
              this.props.invoiceById &&
                _.uniqBy(this.props.invoiceById, "created_date")[0].created_date
            ).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>

        <Table striped bordered>
          <thead>
            <tr>
              <th>Publisher</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.props.invoiceById &&
              this.props.invoiceById.map((item, index) => (
                <tr key={index}>
                  <td> {item.name}</td>
                  <td> {`Rs. ${item.price}.00`}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="float-right">
          <p>Total: Rs. {_.sumBy(this.props.invoiceById, "price")}.00</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ draft_articles, invoiceById, invoiceTotal }) {
  return {
    draft_articles,
    invoiceById,
    invoiceTotal
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editPublishers, getInvoiceById }, dispatch);
}

let editFormData = reduxForm({
  form: "IVOICE_TABLE",
  enableReinitialize: true
})(TableInvoice);
editFormData = connect(mapStateToProps, mapDispatchToProps)(editFormData);
export default editFormData;
