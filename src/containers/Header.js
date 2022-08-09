import React, { Component } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AppNavbarBrand } from "@coreui/react";
import { bindActionCreators } from "redux";
import logo from "../assets/logo-01.png";
import icon from "../assets/icon-01.png";
import UserMenu from "./menus/UserMenu";
import {
  getAllPublishers,
  getPrice,
  getCart,
  removeFromCart
} from "../actions/publishers";
import lodash from "lodash";
import { createInvoice } from "../actions/invoice";
import { toastr } from "react-redux-toastr";
import { withRouter } from 'react-router-dom';
import pub1 from "../assets/img/daily_news.png";
import pub2 from "../assets/img/ft_logo.png";
import CurrencyFormat from 'react-currency-format';
let publisher = [] ;
let cart = [];

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class Header extends Component {
  constructor(props) {
    super(props);
    this.props.getAllPublishers();

    this.state = {
      publishers: []
    };
    this.props.getCart(0);
  }

  componentDidUpdate(nextprop) {
    if (nextprop.publisherCart !== this.props.publisherCart) {
      publisher = this.props.publisherCart;
      this.props.getPrice(this.props.publisherCart);
    }

    this.props.publisherPrice && (cart = this.props.publisherPrice);
  }

  componentWillReceiveProps(nextprop) {
    if (this.state.publishers !== this.props.publisherPrice) {
      this.props.publisherPrice &&
        this.setState({ publishers: this.props.publisherPrice });
    }
    if (this.props.create_invoice !== nextprop.create_invoice) {
      if (nextprop.create_invoice.article_id !== null && nextprop.create_invoice.article_id !== '') {
        localStorage.removeItem("cats_id");
        localStorage.removeItem("publisher_ids");
        localStorage.removeItem("publishers");
        let article_id = nextprop.create_invoice.article_id;
        const { history } = this.props;
        history.push({
          pathname: `create-article/${article_id}`,
          state: { id: article_id }
        })
      } else{
        toastr.error("Please try again! ");
      }
    }
  }

  removeItemFromCart(price_id, publisher) {
    this.props.removeFromCart(price_id, publisher);
  }

  getCount() {
    if (this.props.publisherPrice && this.props.publisherPrice.length > 0) {
      return (
        <span className="cartItemCount">
          {this.props.publisherPrice && this.props.publisherPrice.length}
        </span>
      );
    }
  }

  createInvoice() {
    var publishers = [];
    localStorage.getItem("publisher_ids") &&
      (publishers = JSON.parse(localStorage.getItem("publisher_ids")));
    if (publishers.length > 0) {
      this.props.createInvoice(publishers);
      // window.location.href = "/create-article";
    } else {
      toastr.error(
        "Your cart is empty! , \nplease add publishers before click the submit"
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <AppNavbarBrand
            full={{ src: logo, width: 95, height: 65, alt: "Studio Logo" }}
            minimized={{
              src: icon,
              width: 25,
              height: 25,
              alt: "Studio Icon"
            }}
          />
          <Nav className="ml-auto" navbar>
            <NavItem className="cart">
              <NavLink className="">
                <i className="fa fa-shopping-cart fa-lg"></i> {this.getCount()}
              </NavLink>
              <div className="quickCart">
                <table className="table table-borderless table-sm cartItem">
                  <tbody>
                    {this.props.publisherPrice &&
                      this.props.publisherPrice.map((item, index) => (
                        <tr key={index}>
                          <td width="120px" className="ci__image">
                            <img src={require(`../assets/img/${item.image}`)} />
                          </td>
                          <td className="ci__title_price">
                            <h4>
                              {item.name} <small>- {item.cat_name}</small>
                            </h4>
                            <p>
                              {item.lang_name} -{" "}
                              <CurrencyFormat
                                value={item.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rs. "}
                                suffix={".00"}
                              />
                            </p>
                          </td>
                          <td className="ci_remove_item">
                            <span className="removeItem">
                              <i
                                onClick={() =>
                                  this.removeItemFromCart(
                                    item.id,
                                    item.publisher_id
                                  )
                                }
                                className="fa fa-times text-danger"
                              ></i>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="cartTotal">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <h4 className="mb-0 text-uppercase">Subtotal</h4>
                        </td>
                        <td className="text-right">
                          <h4>
                            <CurrencyFormat
                              value={lodash.sumBy(
                                this.props.publisherPrice,
                                "price"
                              )}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Rs. "}
                              suffix={".00"}
                            />
                          </h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Button
                    color="success"
                    block
                    onClick={() => this.createInvoice()}
                  >
                    Proceed
                  </Button>
                </div>
              </div>
            </NavItem>
            <UserMenu />

          </Nav>
        </div>
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

function mapStateToProps({ somedata, publisherCart, publisherPrice, create_invoice }) {
  return {
    somedata,
    publisherCart,
    publisherPrice,
    create_invoice
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPrice,
      getAllPublishers,
      getCart,
      removeFromCart,
      createInvoice
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
