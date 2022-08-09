import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getLanguage } from "../../actions/languages";
import { getLanguagePublisher } from "../../actions/languages";
import { Button } from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class ViewLanguage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languages: [],
      language_publishers:[]
    };
  }

  view_language_publisher = (id) => {
    this.props.getLanguagePublisher(id);
  };

  componentWillReceiveProps(nextProps){
    if(this.props.languages !== nextProps.languages){
      this.setState({languages:nextProps.languages})
    }
    if(this.props.language_publishers !== nextProps.language_publishers){
      this.setState({language_publishers:nextProps.language_publishers})
    }
  }

  //rendering details to the table
  render_language = rows => {
    const { languages } = this.state;
    console.log("====", this.state.language_publishers);
    
    if (languages) {
      return languages.map(row => {
        return (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.no_articles}</td>
            <td>
              <Button outline color="success" onClick={()=>this.view_language_publisher(row.id)}>
                <i className="fa fa-eye"></i>
              </Button>
            </td>
          </tr>
        );
      });
    }
  };

  componentDidMount() {
    this.props.getLanguage();
  }



  render() {
    const cols = {
      marginTop: 25
    };

    const navItem = {
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "#ef6e2f",
      marginLeft: 10
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col" style={{ marginTop: 25 }}>
            <div className="card">
              <div className="card-header">
                <i className="fa fa-calendar-plus-o"></i> Available languages
              </div>
              <div className="card-body">
                <table className="table table-responsive-sm table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Language</th>
                      <th>No:Publishers</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{this.render_language()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ languages, language_publishers }) {
  return {
    languages,
    language_publishers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getLanguage,
      getLanguagePublisher
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLanguage);
