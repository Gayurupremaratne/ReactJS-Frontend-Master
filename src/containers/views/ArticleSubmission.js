import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  Col, Container, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import ArticleSubmissionForm from '../forms/ArticleSubmissionForm';
import {addArticles} from '../../actions/Advertiserarticles'


class ArticleSubmission extends Component {

  render() {
    return (
      
      <div className="app">
		<Container>
			<Row className="">  
				<Col>  
        

					<ArticleSubmissionForm onSubmit={addArticles}/>
				</Col>       
			</Row>
        </Container>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addArticles
  }, dispatch);
}


export default (connect(null, mapDispatchToProps)(ArticleSubmission));
