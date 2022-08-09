import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";


export class NewPlan extends Component {
  render() {
    const btnAdd = {
      width: "100%",
      maxWidth: 80,
      fontWeight: "bold",
      padding: 5
    };

    const cardView = {
      marginTop: 25,
      borderRadius: 12,
      padding: 10
    };

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Card style={cardView}>
                <CardBody>
                  <CardTitle style={{ fontSize: 22, fontWeight: "bold" }}>
                    Create a new plan
                  </CardTitle>
                  <form action="" method="post">
                    <div class="form-group">
                      <label for="nf-email">Company name:</label>
                      <input
                        class="form-control"
                        id="nf-email"
                        type="name"
                        name="nf-email"
                        placeholder="Enter company.."
                        autocomplete="email"
                      />
                    </div>
                    <FormGroup>
                      <Label for="exampleSelect">Publisher</Label>
                      <Input type="select" name="select" id="exampleSelect">
                        <option>Daily Mirror-English</option>
                        <option>Ceylon Today-English</option>
                        <option>Daily News-English	</option>
                        <option>Dinamina-Sinhala</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="exampleSelect">Category</Label>
                      <Input type="select" name="select" id="exampleSelect">
                        <option>Sports</option>
                        <option>Buisness</option>
                        <option>Fashion</option>
                        <option>Education</option>
                        <option>Politics</option>
                      </Input>
                    </FormGroup>
                    <div class="form-group">
                      <label for="nf-email">No: of articles:</label>
                      <input
                        class="form-control"
                        id="nf-email"
                        type="number"
                        name="nf-email"
                        placeholder="No of articles.."
                      />
                    </div>

                    <button class="btn btn-sm btn-success" type="submit">
                      <i class="fa fa-plus"></i> Add
                    </button>

                    <div class="form-group">
                      <label for="nf-email" style={{ marginTop: 10 }}>
                        Price:
                      </label>
                      <input
                        class="form-control"
                        id="nf-email"
                        type="number"
                        name="nf-email"
                        placeholder="Price.."
                      />
                    </div>
                    <div style={{ marginTop: 15 }}>
                      <div style={{ display: "inline-block" }}>
                        <button class="btn btn-sm btn-primary" type="submit">
                          <i class="fa fa-dot-circle-o"></i> Submit
                        </button>
                      </div>
                      <div style={{ display: "inline-block", marginLeft: 10 }}>
                        <button class="btn btn-sm btn-danger" type="reset">
                          <i class="fa fa-ban"></i> Reset
                        </button>
                      </div>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <div class="card" style={cardView}>
                <div class="card-header">Fields</div>
                <div class="card-body">
                  <table class="table table-responsive-sm table-striped">
                    <thead>
                      <tr>
                        <th>Publisher</th>
                        <th>Category</th>
                        <th>Article No.</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Lankadeepa-Sinhala</td>
                        <td>Sports</td>
                        <td>5</td>
                        <td>
                          <Button outline color="danger">
                            <i class="fa fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>Lankadeepa-Sinhala</td>
                        <td>Sports</td>
                        <td>5</td>
                        <td>
                          <Button outline color="danger">
                            <i class="fa fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>Lankadeepa-Sinhala</td>
                        <td>Sports</td>
                        <td>5</td>
                        <td>
                          <Button outline color="danger">
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default NewPlan;
