import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';
import {withRouter} from 'react-router'

import LoginForm from './forms/LoginForm';
import { login } from '../actions/index';

class Login extends Component {

  render() {
    const { login } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <LoginForm onSubmit={login} />
                  </CardBody>
                </Card>
              
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login
  }, dispatch);
}


export default withRouter(connect(null, mapDispatchToProps)(Login));