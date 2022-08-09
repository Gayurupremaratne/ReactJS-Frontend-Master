import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getPrice, updatePrice } from "../../actions/price";
import { getPublisherList } from "../../actions/publishers";
import { getCategoriesList } from "../../actions/categories";
import Popup from "reactjs-popup";
import AddPriceForm from "../forms/AddPriceForm";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label
} from "reactstrap";

class CategoryPrice extends Component {
  constructor(props) {
    super(props);
    this.edit_price = this.edit_price.bind(this);
    this.state = {
      prices: [],
      publisher: [],
      id_cat: "",
      id_pubs: "",
      cat_error: "",
      pubs_error: "",
      value: "",
      publisher_error: "",
      categories_error: "",
      pid: "",
      cid: ""
    };
  }

  componentDidMount() {
    this.props.getPrice();
    this.props.getPublisherList();
    this.props.getCategoriesList();
  }

  edit_price = event => {
    event.preventDefault();

    const price = this.state.value;

    this.props.updatePrice(
      price,
      event.target.pid.value,
      event.target.cid.value
    );
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  onCategoryChange(event) {
    this.setState({ id_cat: event.target.value }, () => {
      console.log("states cat:", this.state.id_cat);
      this.loadList();
    });
  }

  onPublisherChange(event) {
    this.setState({ id_pubs: event.target.value }, () => {
      console.log("states pub:", this.state.id_pubs);
      this.loadList();
    });
  }

  loadList() {
    console.log("load publishers");
    console.log("state cat", this.state.id_cat);
    console.log("state pub", this.state.id_pubs);

    if (this.state.id_cat == null || this.state.id_cat.trim() == "") {
      this.setState({ cat_error: "please select category" });
    } else if (this.state.id_pubs == null || this.state.id_pubs.trim() == "") {
      this.setState({ pub_error: "please select publisher" });
    } else {
      this.setState({ cat_error: "" });
      this.setState({ pub_error: "" });
    }
  }

  //rendering details to the table
  render_prices = rows => {
    const { prices } = this.props;
    if (prices) {
      return prices.map(row => {
        return (
          <tr key={row.id}>
            <td>{row.pub_name}</td>
            <td>{row.cat_name}</td>
            <td>{row.price}</td>
            <td>
              <Popup
                trigger={
                  <button
                    type="button"
                    className="btn btn-outline-warning outline"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                }
                position="left center"
              >
                <div>
                  <Label for="enterEmail">Enter price to update</Label>

                  <form onSubmit={this.edit_price}>
                    <input type="number" onChange={this.handleChange} />
                    <input type="hidden" value={row.cid} name="cid" />
                    <input type="hidden" value={row.pid} name="pid" />
                    <input
                      type="submit"
                      value="Submit"
                      style={{ marginTop: 5 }}
                    />
                    <input
                      type="button"
                      value="Cancel"
                      style={{ marginLeft: 10, marginTop: 5 }}
                    />
                  </form>
                </div>
              </Popup>
            </td>
          </tr>
        );
      });
    }
  };

  componentDidUpdate(prev) {
    if (this.props.prices !== prev.prices) {
      console.log("This", this.props.prices);
    }
  }

  render() {
    

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
                    Add Price per Category
                  </CardTitle>
                  <AddPriceForm />
                </CardBody>
              </Card>
            </Col>
            <Col>
              <div class="card" style={cardView}>
                <div class="card-header"> Price per Category</div>
                <div class="card-body">
                  <table class="table table-responsive-sm table-striped">
                    <thead>
                      <tr>
                        <th>Publisher</th>
                        <th>Category</th>
                        <th>Price(LKR)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{this.render_prices(this.state.prices)}</tbody>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ prices, publishers, categories }) {
  return {
    prices,
    publishers,
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPrice,
      updatePrice,
      getPublisherList,
      getCategoriesList
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPrice);
