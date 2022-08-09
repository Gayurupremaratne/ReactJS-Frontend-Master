import React, { Component } from "react";
import { Button } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { getArticleHistory } from "../../actions/articlesActions";

export class ArticleHist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  componentDidMount(){
    var access_token = localStorage.getItem("access_token");
    if (access_token == null) {
      this.props.history.push("/login");
    }
    this.props.getArticleHistory();
  }

  componentDidUpdate(prev) {
    if (this.props.articles != prev.articles) {
      console.log("This",this.props.articles);
    }
  }

  delete_submit = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes")
        },
        {
          label: "No",
          onClick: () => alert("Click No")
        }
      ]
    });
  };

  
  history_articleList = rows => {
    const { articles } = this.props;
    if (articles) {
      return articles.map(row => {
        return (
          <tr key={row.id}>
             <td>{row.title}</td>
             <td>{row.name}</td>
             <td>{row.created_date}</td>
             <td>{row.publish_date}</td>
             <td>{row.status}</td>
            <td>
              <Button outline color="success">
                <i className="fa fa-eye"></i>
              </Button>
              <Button outline color="danger" style={{ marginLeft: 5 }}  onClick={this.delete_submit}>
                <i className="fa fa-trash"></i>
              </Button>
            </td>
          </tr>
        );
      });
    }
  };
  render() {
    const cols = {
      marginTop: 75
    };
    const articleItem = {
      cursor: "pointer"
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col" style={cols}>
            <div className="card">
              <div className="card-header">
                <i className="fa fa-history"></i> Article History
              </div>
              <div className="card-body">
                <table className="table table-responsive-sm table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Publisher</th>
                      <th>Submitted date</th>
                      <th>Published date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody style={articleItem}>
                      {this.history_articleList(this.state.articles)}
                  </tbody>
                </table>
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Prev
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ articles }) {
  return {
    articles
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getArticleHistory
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleHist);
