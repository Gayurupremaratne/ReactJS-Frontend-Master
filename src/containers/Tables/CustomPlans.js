import React, { Component } from "react";
import { Button } from "reactstrap";
import { Nav, NavItem, NavLink } from "reactstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class CustomPlans extends Component {

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
  render() {
    const cols = {
      marginTop: 25
    };

    const navItem = {
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "#ef6e2f",
      marginLeft: 890
    };

    return (
      <div class="container">
        <div class="row">
          <div class="col" style={{ marginTop: 25 }}>
            <Nav style={{ marginBottom: 10 }}>
              <NavItem style={navItem}>
                <NavLink href="/NewPlan">Create Plan</NavLink>
              </NavItem>
            </Nav>
            <div class="card">
              <div class="card-header">
                <i class="fa fa-calendar-plus-o"></i> Available plans
              </div>
              <div class="card-body">
                <table class="table table-responsive-sm table-striped">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>No:Article</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Yiorgos Avraamu</td>
                      <td>6</td>
                      <td>Rs 4500.00</td>
                      <td>
                        <Button outline color="success">
                          <i class="fa fa-eye"></i>
                        </Button>
                        <Button
                          outline
                          color="danger"
                          style={{ marginLeft: 5 }}
                          onClick={this.delete_submit}
                        >
                          <i class="fa fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Yiorgos Avraamu</td>
                      <td>6</td>
                      <td>Rs 4500.00</td>
                      <td>
                        <Button outline color="success">
                          <i class="fa fa-eye"></i>
                        </Button>
                        <Button
                          outline
                          color="danger"
                          style={{ marginLeft: 5 }}
                        >
                          <i class="fa fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Yiorgos Avraamu</td>
                      <td>6</td>
                      <td>Rs 4500.00</td>
                      <td>
                        <Button outline color="success">
                          <i class="fa fa-eye"></i>
                        </Button>
                        <Button
                          outline
                          color="danger"
                          style={{ marginLeft: 5 }}
                        >
                          <i class="fa fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Yiorgos Avraamu</td>
                      <td>6</td>
                      <td>Rs 4500.00</td>
                      <td>
                        <Button outline color="success">
                          <i class="fa fa-eye"></i>
                        </Button>
                        <Button
                          outline
                          color="danger"
                          style={{ marginLeft: 5 }}
                        >
                          <i class="fa fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Yiorgos Avraamu</td>
                      <td>6</td>
                      <td>Rs 4500.00</td>
                      <td>
                        <Button outline color="success">
                          <i class="fa fa-eye"></i>
                        </Button>
                        <Button
                          outline
                          color="danger"
                          style={{ marginLeft: 5 }}
                        >
                          <i class="fa fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#">
                      Prev
                    </a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      4
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
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

export default CustomPlans;
