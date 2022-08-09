import React, { Component } from "react";
import { Alert, Card, CardBody, CardTitle, Button } from "reactstrap";
import { Row, Container, Col } from "reactstrap";
import NewArticle from "../Tables/NewArticle";
class AdminDashboard extends Component {
    
  render() {

    const contain ={
        margin: 'auto'
    }
    
    const colm ={
        margin: 25
    }
        
    const cardView ={
        marginTop: 35,
        justifyContent: 'center',
        padding: 8,
        
    }
    const cardBdy={
        justifyContent: 'center',
        padding: 8,
        marginTop:10
    }

    return (
      <div>
        <Container style={contain}>
          <Row>
            <Col style={colm}>
            <h2>Pending Articles</h2>
              <Card style={cardView}>
                <CardBody style={cardBdy}>
                  <NewArticle />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AdminDashboard;
