import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { bindActionCreators } from "redux";
import { getArticles } from "../../actions/articlesActions";
import { connect } from "react-redux";

class NewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  //rendering details to the table
  new_articleList = rows => {
    const {articles} = this.props;
    if(articles){
      return articles.map(row => {
        return (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.title}</td>
            <td>{row.created_by}</td>
            <td>{row.status}</td> 
            <td>{row.name}</td> 
            <td>
              <Button outline color="success">
                <i class="fa fa-eye"></i>
              </Button>
              </td>
            {/* row.name is the publisher name */}
          </tr>
        );
      });
    }
  };

 
  componentDidMount() {
    this.props.getArticles();
  }

  componentDidUpdate(prev) {
    if (this.props.articles != prev.articles) {
      console.log("This",this.props.articles);
    }
  }

  render() {
    const articleItem = {
      cursor: "pointer"
    };

    return (
      <Table hover>
        <thead>
          <tr>
            <th>Article ID</th>
            <th>Article Name</th>
            <th>Advertiser</th>
            <th>Status</th>
            <th>Publisher</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={articleItem}>
          {this.new_articleList(this.state.articles)}
        </tbody>
      </Table>
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
      getArticles
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewArticle);
