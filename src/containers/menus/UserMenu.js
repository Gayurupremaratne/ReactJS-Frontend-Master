import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { confirmAlert } from "react-confirm-alert"; // Import

import {
  Modal,
  ModalHeader,
  ModalBody,
  NavItem,
  Button
} from "reactstrap";
import { login } from "../../actions/index";
import { logout } from "../../actions/index";
import LoginForm from "../forms/LoginForm";

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      modal: false,
      isLoggedIn: true
    };
    this.toggleModel = this.toggleModel.bind(this);
  }

  // componentDidMount() {
  //  /// var access_token = localStorage.getItem("access_token");

  //   if (access_token !== null) {
  //     this.setState({ isLoggedIn: true });
  //   }
  // }

  check_logout = () => {
    confirmAlert({
      title: "user logout",
      message: "Are you sure to do this?",
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

  toggleModel() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { login, logout } = this.props;
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <NavItem>
        {isLoggedIn ? (
          <Button color="primary" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color="primary" onClick={this.toggleModel}>
            Dashboard
          </Button>
        )}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModel}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModel}>Login</ModalHeader>
          <ModalBody>
            <LoginForm onSubmit={login} />
          </ModalBody>
        </Modal>
      </NavItem>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login,
      logout
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
