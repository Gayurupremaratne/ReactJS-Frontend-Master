import React, { Component } from "react";
import { Button } from "reactstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Nav, NavItem, NavLink } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getPublishers } from "../../actions/publishers";
import { editPublishers } from "../../actions/publishers";
import { deletepublisher } from "../../actions/publishers";
import { closeDialog, openDialog } from "redux-reactstrap-modal";
import { SelectionState } from "@devexpress/dx-react-grid";
import {
  EditingState,
  PagingState,
  IntegratedSelection,
  FilteringState,
  IntegratedFiltering,
  IntegratedPaging
} from "@devexpress/dx-react-grid";

import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableFilterRow,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";

class Publisher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      rows: [],
      modalIsOpen: false,
      update_email: "something@gmail.com"
    };
  }

  componentDidMount() {
    this.props.getPublishers();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('props==>',this.props)
    if (prevProps.pubdelete !== this.props.pubdelete) {
      this.props.getPublishers();
      //window.location.reload();
    }
    // if (prevProps.pubupdate !== this.props.pubupdate) {
    //  console.log(this.props.pubupdate)
    // }
  }

  componentWillReceiveProps(nextProps) {
    var articleObj = {};
    var articleDataSet = [];
    if (nextProps.publishers) {
      for (var i = 0; i < nextProps.publishers.length; i++) {
        var rowData = nextProps.publishers[i];
        articleObj = Object.assign({}, this.state.accData);
        articleObj.publihser = rowData.pub_name;
        articleObj.email = rowData.email;
        articleObj.langauge = rowData.lang_name;
        articleObj.id = rowData.id;
        articleDataSet.push(articleObj);
      }
    }
    this.setState({ rows: articleDataSet });
  }

  //embed all modals in to Action column
  ActionCell({ row, column, ...restProps }) {
    return column.name === "actions" ? (
      <Table.Cell className="">
        <Button
          outline
          color="danger"
          style={{ marginLeft: 5 }}
          onClick={() => {
            this.delete_submit(row.id);
          }}
        >
          <i className="fa fa-trash"></i>
        </Button>
        <button onClick={() => this.props.openDialog("EDIT_TEMPLATE",{data:row.id})}   className="btn btn-outline-warning outline" style={{marginLeft:7}}> <i className="fa fa-pencil"></i></button>
        
      </Table.Cell>
    ) : (
      <Table.Cell row={row} column={column} {...restProps} />
    );
  }
  thisClick = props => {
    //console.log("*********", props);
  };

  // Changing Table tags so we can custormize table
  tableComponent({ row, column, ...restProps }) {
    return (
      <Table.Table
        className="open-table table-border"
        row={row}
        column={column}
        {...restProps}
      />
    );
  }

  delete_submit = props => {
    //console.log("props", props);

    confirmAlert({
      title: "Delete publisher",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deletepublisher(props)
        },
        {
          label: "No",
          onClick: () => alert("Click No")
        }
      ]
    });
  };

  edit_email = event => {
    event.preventDefault();

    const email = this.state.update_email;
    const id = event.target.id.value;
    console.log("email======>", email);
    console.log("id======>", id);
    this.props.editPublishers(email, id);
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
   

    const navItem = {
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "#ef6e2f",
      marginLeft: 880
    };

    const { rows } = this.state;
    const columns = [
      { name: "publihser", title: "Publisher Name" },
      { name: "email", title: "Email" },
      { name: "langauge", title: "Language" },
      { name: "actions", title: "Actions" }
    ];

    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-user"></i> Publisher
              </div>
              <Nav>
                <NavItem style={navItem}>
                  <NavLink href="/create-publisher">Create Publisher</NavLink>
                </NavItem>
              </Nav>
              <div className="card-body">
                <Grid rows={rows} columns={columns}>
                  <EditingState />
                  <SelectionState />
                  <PagingState defaultCurrentPage={0} pageSize={5} />
                  <FilteringState defaultFilters={[]} />
                  <IntegratedFiltering />
                  <IntegratedPaging />

                  <IntegratedSelection />
                  <Table
                    tableComponent={this.tableComponent}
                    cellComponent={this.ActionCell.bind(this)}
                  />
                  <TableHeaderRow />
                  <TableFilterRow />
                  <TableEditRow />
                  <PagingPanel />
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ publishers, pubdelete, pubupdate }) {
  return {
    publishers,
    pubdelete,
    pubupdate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeDialog, 
      openDialog,
      getPublishers,
      editPublishers,
      deletepublisher
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Publisher);
