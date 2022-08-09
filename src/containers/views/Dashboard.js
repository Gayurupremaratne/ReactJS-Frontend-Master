import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink } from "reactstrap";
import {
  getDraftArticles,
  getPublushersForaAnArticle
} from "../../actions/articlesActions";
import { getCategoris } from "../../actions/categories";
import { getInvoiceById, getInvoiceTotal } from "../../actions/invoice";
import { Button, Badge, Collapse, CardBody, Card } from "reactstrap";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import DateRangePicker from "react-daterange-picker";
import { extendMoment } from "moment-range";
import "react-daterange-picker/dist/css/react-calendar.css";

const moments = extendMoment(moment);

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    const today = moment();
    this.state = {
      filteredArticlesList: this.props.draft_articles,
      invoice: null,
      isOpen: false,
      indexNo: null,
      dropdownOpen: false,
      category: false,
      show: true,
      calanderIsOpen: false,
      value: moment.range(today.clone().subtract(7, "days"), today.clone()),
      startDate: new Date(),
      endDate: new Date()
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleFilterStatus = this.toggleFilterStatus.bind(this);
  }

  componentDidMount() {
    const data = {
      created_by: localStorage.getItem("username"),
      status: "3"
    };

    this.props.getDraftArticles(data);
    this.props.getPublushersForaAnArticle(12);
    this.props.getCategoris();
  }

  onSelect = (value, states) => {
    this.setState({ value, states });
    let start = value.start.format("YYYY-MM-DD");
    let end = value.end.format("YYYY-MM-DD");
    let due;
    let list = [];
    console.log("start", start, "== end", end);
    const { draft_articles } = this.props;
    draft_articles.map(element => {
      due = moment(element.created_date).format("YYYY-MM-DD");

      if (due >= start && due <= end) {
        list.push(element);
        console.log("added");
      } else {
        console.log("not added");
      }
    });
    this.setState({ show: false });
    this.setState({ filteredArticlesList: list });
  };

  onToggleCalander = () => {
    this.setState({
      calanderIsOpen: !this.state.calanderIsOpen
    });
  };

  toggle = (invoice, index) => {
    this.setState({
      isOpen: !this.state.isOpen,
      indexNo: index
    });
    this.setState({ invoice: invoice });
  };

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  handleClick(article_id) {
    const { history } = this.props;
    history.push({
      pathname: `create-article/${article_id}`,
      state: { id: article_id }
    })
  }




  renderToggleData = () => {
    var list = this.props.draftPublisher;
    var newList = _.filter(list, [
      "invoice_id",
      this.state.invoice && this.state.invoice
    ]);


    
    return newList.map((element, index) => {
      return (
        <div className="card border" key={index}>
          <div className="card-body">
            <div className="container">
              <div
                className="row"
                style={{ verticalAlign: "middle", lineHeight: "50px" }}
              >
                <div className="col-sm">
                  <img
                    src={require(`../../assets/img/${element.image}`)}
                    width="100"
                    height="90"
                  />
                </div>
                <div className="col-sm">
                  <p style={{ padding: 20 }}>{element.publisher}</p>
                </div>
                <div className="col-sm">
                  <p style={{ padding: 20 }}>
                    <CurrencyFormat
                      value={element.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rs."}
                      suffix={".00"}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  renderOwn = articles => {
    if (articles) {
      return articles.map((element, index) => {
       
        return (
          <div key={index}>
            <table className="table table-custom">
              <tbody>
                <tr className="table-active">
                  <td style={{ width: 50 }}>
                    <Button
                      outline
                      color="link"
                      size="sm"
                      onClick={() => {
                        this.toggle(element.invoice, index);
                      }}
                    >
                      <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    </Button>
                  </td>
                  <td style={{ width: 220 }}>
                    <p>
                      <span className="text-black-50">ID:</span>
                      {element.article_id}
                    </p>
                    <p>
                      <span className="text-black-50">Title:</span>
                      {element.article_title}
                    </p>
                  </td>
                  <td style={{ width: 190 }}>
                    <p>
                      <span className="text-black-50">Category: </span>
                      {element.category}
                    </p>
                  </td>
                  <td style={{ width: 270 }}>
                    <p>
                      <span className="text-black-50">Created date:</span>
                      {moment(element.created_date).format("YYYY-MM-DD HH:mm")}
                    </p>
                  </td>
                  <td style={{ width: 270 }}>
                    <p>
                      <span className="text-black-50">Order Amount:</span>
                      <CurrencyFormat
                        value={element.total}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rs."}
                        suffix={".00"}
                      />
                    </p>
                  </td>

                  <td style={{ align: "justify", width: 200 }}>
                    {(() => {
                      switch (element.status) {
                        case 1:
                          return <Badge color="warning">Pending</Badge>;
                        case 2:
                          return <Badge color="danger">Rejected</Badge>;
                        case 3:
                          return <Badge color="success">Approved</Badge>;
                        case 4:
                          return <Badge color="info">Published</Badge>;
                        default:
                          return <Badge color="secondary">Submitted</Badge>;
                      }
                    })()}
                  </td>
                  <td style={{ width: 150 }}>
                    {element.status == 1 ? (
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => {
                          this.handleClick(element.article_id);
                        }}
                      >
                        <i className="fa fa-upload" aria-hidden="true"></i>
                      </Button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <Collapse
              isOpen={this.state.indexNo === index && this.state.isOpen}
            >
              {this.renderToggleData()}
            </Collapse>
          </div>
        );
      });
    }
  };

  toggleFilter(keyword) {
    var list = this.props.draft_articles;
    if (keyword === "all" || keyword == "") {
      this.setState({ filteredArticlesList: list });
    } else {
      var newList = _.filter(list, ["category", keyword]);

      this.setState({ show: false });
      this.setState({ filteredArticlesList: newList });
    }
  }

  toggleFilterStatus(keyword) {
    var list = this.props.draft_articles;
    if (keyword === "all" || keyword == "") {
      this.setState({ filteredArticlesList: list });
    } else {
      var integer = parseInt(keyword, 10);
      var newList = _.filter(list, ["status", integer]);

      this.setState({ show: false });
      this.setState({ filteredArticlesList: newList });
    }
  }

  renderDropDownItems = () => {
    if (this.props.categories) {
      return this.props.categories.map((element, index) => {
        return (
          <option value={element.cat_name} key={index}>
            {element.cat_name}
          </option>
        );
      });
    }
  };

  renderSelectionValue = () => {
    return (
      <div>
        <div>Date Range</div>
      </div>
    );
  };

  render() {
    let showList;
    if (this.state.show) {
      showList = this.renderOwn(this.props.draft_articles);
    } else {
      showList = this.renderOwn(this.state.filteredArticlesList);
    }
    return (
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col">
            <Nav>
              <NavItem style={{ marginBottom: 10 }}>
                <NavLink
                  href="/category"
                  className="btn btn-success"
                  style={{ fontWeight: 900 }}
                >
                  Create new article
                </NavLink>
              </NavItem>
            </Nav>

            <div className="row">
              <div className="col-12 col-lg-4">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label
                      className="input-group-text"
                      for="inputGroupSelect01"
                    >
                      Category
                    </label>
                  </div>
                  <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    onChange={e => {
                      this.toggleFilter(e.target.value);
                    }}
                  >
                    <option value="all">All</option>
                    {this.renderDropDownItems()}
                  </select>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label
                      className="input-group-text"
                      for="inputGroupSelect01"
                    >
                      Status
                    </label>
                  </div>
                  <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    onChange={e => {
                      this.toggleFilterStatus(e.target.value);
                    }}
                  >
                    <option value="all">All</option>
                    <option value="1">pending</option>
                    <option value="5">submitted</option>
                    <option value="2">rejected</option>
                    <option value="3">approved</option>
                    <option value="4">published</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="daterangepicker_wrap">
                  <div>
                    <input
                      type="text"
                      value={
                        moment(this.state.value.start).format("YYYY/MM/DD") +
                        ` - ` +
                        moment(this.state.value.end).format("YYYY/MM/DD")
                      }
                      className="form-control"
                      onClick={() => this.onToggleCalander()}
                    />
                  </div>
                  {this.state.calanderIsOpen && (
                    <DateRangePicker
                      value={this.state.value}
                      onSelect={this.onSelect}
                      singleDateRange={true}
                    />
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-1">
                <button
                  class="btn btn-primary"
                  onClick={() => {
                    window.location.href = `/dashboard`;
                    // this.setState({ show: true });
                  }}
                >
                  <i class="fas fa-sync"></i>
                </button>
              </div>
            </div>

            {showList}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({
  draft_articles,
  invoiceById,
  invoiceTotal,
  draftPublisher,
  categories
}) {
  return {
    draftPublisher,
    draft_articles,
    invoiceById,
    invoiceTotal,
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPublushersForaAnArticle,
      getDraftArticles,
      getInvoiceById,
      getInvoiceTotal,
      getCategoris
    },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
