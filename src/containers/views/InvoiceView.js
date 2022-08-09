import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getInvoiceById, getInvoiceTotal } from "../../actions/invoice";
import { withRouter } from "react-router-dom";

import { Table, Button } from "reactstrap";

export class InvoiceView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // var access_token = localStorage.getItem("access_token");
    // if(access_token == null){
    //   this.props.history.push("/login") 
    // }
    const invoice_id = localStorage.getItem("invoice_id");
    if (invoice_id) {
      this.props.getInvoiceById(invoice_id);
      this.props.getInvoiceTotal(invoice_id);
      console.log(">>>>>>>>>", invoice_id);
    }
  }

  render() {
    return (
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Publisher</th>
              <th>Amount</th>
              <th>Created date</th>

            </tr>
          </thead>
          <tbody>
            {this.props.invoiceById &&
              this.props.invoiceById.map((item, index) => (
                <tr key={index}>
                  <td> {item.name}</td>
                  <td> {item.price}</td>
                  <td> {item.created_date}</td>
                </tr>
              ))}
            <tr>
              <th>Total</th>
              {this.props.invoiceTotal &&
                this.props.invoiceTotal.map((Price, index) => (
                  <th key={index}> {Price.total}</th>
                ))}
            </tr>
          </tbody>
        </Table>

        <Button color="danger" onClick={() => this.props.history.go(-1)}>
          Back
        </Button>
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
  return bindActionCreators(
    {
      getInvoiceById,
      getInvoiceTotal
    },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvoiceView));
