import React, { Component } from "react";
import { Button } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAdvertiserArticleHistory } from "../../actions/articlesActions";
import moment from "moment";
import { SelectionState } from "@devexpress/dx-react-grid";
import { BASE_URL } from "../../config/globals";
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

export class AdverstiserArticleHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: []
    };
  }

  componentDidMount() {
   
    const data = {
      username: localStorage.getItem("username")
    };
    this.props.getAdvertiserArticleHistory(data);
  }

  componentWillReceiveProps(nextProps) {
    var articleObj = {};
    var articleDataSet = [];
    if (nextProps.article_list) {
      for (var i = 0; i < nextProps.article_list.length; i++) {
        var rowData = nextProps.article_list[i];
        articleObj = Object.assign({}, this.state.accData);
        articleObj.title = rowData.title;
        articleObj.created = moment(rowData.created_date).format(
          "YYYY-MM-DD HH:mm"
        );
        articleObj.updated = moment(rowData.updated_date).format(
          "YYYY-MM-DD HH:mm"
        );

        var tempStatus = rowData.status;
        if (tempStatus === 1) {
          tempStatus = "approved";
        } else if (tempStatus === 2) {
          tempStatus = "rejected";
        }
        else if (tempStatus === 3) {
          tempStatus = "published";
        } else {
          tempStatus = "pending";
        }
        articleObj.status = tempStatus;
        articleObj.file_path = rowData.file_path;
        articleDataSet.push(articleObj);
      }
    }
    this.setState({ rows: articleDataSet });
  }

  downloadFile(file_path) {
    console.log(file_path);
    window.location.href = BASE_URL + '/public/' + file_path;
  }

  //embed all modals in to Action column
  ActionCell({ row, column, ...restProps }) {
    return column.name === "actions" ? (
      <Table.Cell className="">
        <Button outline color="success" onClick={this.onQuickClick}>
          <i className="fa fa-eye"></i>
        </Button>
        <Button outline color="info" onClick={() => this.downloadFile(row.file_path)} style={{ marginLeft: 5 }}>
          <i class="fa fa-download"></i>
        </Button>
      </Table.Cell>
    ) : (
        <Table.Cell row={row} column={column} {...restProps} />
      );
  }

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

  render() {
    const { rows } = this.state;
    const columns = [
      { name: "title", title: "Title" },
      { name: "created", title: "Created date" },
      { name: "updated", title: "Updated date" },
      { name: "status", title: "Status" },
      { name: "actions", title: "Actions" }
    ];

    console.log("******", this.state.rows);
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-history"></i> Article History
              </div>
              <div className="card-body">
                <Grid
                  rows={rows}
                  columns={columns}>
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
function mapStateToProps({ article_list }) {
  return {
    article_list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAdvertiserArticleHistory
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdverstiserArticleHistory);
