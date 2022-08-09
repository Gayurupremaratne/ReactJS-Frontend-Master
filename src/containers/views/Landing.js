import React, { Component } from "react";
import { Button, Col, Row, Container } from "reactstrap";
import Header from "../Header";
import mainImage from "../../assets/img/landing_main.png";
import { AppHeader } from "@coreui/react";
import { getLanguage } from "../../actions/language";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../actions/index";
import { withRouter } from 'react-router-dom';
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isOpen: false
    };
    
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.onQuickClick = this.onQuickClick.bind(this);
    this.onCustomClick = this.onCustomClick.bind(this);
  }

  componentDidMount(){
    // var access_token = localStorage.getItem('access_token');
    // console.log(access_token);
    
    // if(access_token == null){
    //   this.props.history.push("/login") 
    // }
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }
  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  onQuickClick() {
    window.location.href = "/category";
  }
  onCustomClick() {
    window.location.href = "/contactus";
  }

  dashboard_handler = () => {
    window.location.href = "/dashboard";
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <div className="animated fadeIn">
        {/* <AppHeader>
          <Header />
        </AppHeader> */}
        <Container className="mt-4">
          <Row>
            <Col>
              <img
                src="/static/media/logo-01.825d7906.png"
                width="95"
                height="65"
                alt="Studio Logo"
                className="navbar-brand-full"
              ></img>
            </Col>
            <Col>
              <Button
                color="primary"
                onClick={this.dashboard_handler}
                className="float-right"
                style={{ marginTop: 20, cursor: "pointer" }}
              >
                Dashboard
              </Button>
              <Button
                color="primary"
                onClick={this.props.logout}
                className="float-right"
                style={{ marginTop: 20, marginRight: 10, cursor: "pointer" }}
              >
                Logout
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm="12" lg="7">
              <img src={mainImage} className="img-fluid" />
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col className="text-center">
              <Button
                onClick={this.onQuickClick}
                color="primary"
                size="lg"
                className="mr-3"
              >
                Single Article
              </Button>
              <Button
                onClick={this.onCustomClick}
                color="primary"
                size="lg"
                className="mr-3"
                outline
              >
                Multiple Article
              </Button>
            </Col>
          </Row>
        </Container>
        <div></div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout
    },
    dispatch
  );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));
