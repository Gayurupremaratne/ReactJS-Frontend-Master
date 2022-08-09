import React, { Component } from "react";
import {
  Card,
  CardBody,
  Button,
  FormGroup,
  Table,
  Input,
  Label,
  Container,
  Row,
  Col,
  FormText
} from "reactstrap";
import { getCategoris } from "../../actions/categories";
import { getLanguage } from "../../actions/language";
import { getAllPublishers, getPrice } from "../../actions/publishers";
import { listpublisher, addToCart } from "../../actions/publishers";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import Header from "../Header";
import { AppHeader } from "@coreui/react";
import { withRouter } from "react-router";
import lodash from "lodash";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

const IMG_URL = "../../assets/img/";
let publishers = [];

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.images,
      id_cat: "",
      id_lan: "",
      // publishers:JSON.parse(localStorage.getItem("publishers")),
      cat_error: "",
      lang_error: "",
      publisher_error: "",
      publishers: [],
      categories: [],
      language: []
    };
    this.onQuickClick = this.onQuickClick.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.props.getAllPublishers();
    this.props.getCategoris();
    this.props.getLanguage();
  }

  componentDidMount() {
    //this.props.getCategoris();
    //this.props.getLanguage();
    //this.props.listpublisher();
  }

  onSubmit(e) {
    localStorage.setItem("form", e);
  }

  onQuickClick() {
    //pass to localstorage
    window.location.href = "/invoice";
  }

  componentDidUpdate(nextProps) {
    if (this.props.publisherAll !== this.state.publishers) {
      this.setState({ publishers: this.props.publisherAll }, () => {
        //console.log("publishers_state:", this.state.publishers);
      });
      //console.log("all_publishers: ", this.props.publisherAll);
    }

    if (this.props.categories !== this.state.categories) {
      this.setState({ categories: this.props.categories }, () => {
        //console.log("categories_state:", this.state.categories);
      });
      //console.log("all_categories: ", this.props.categories);
    }

    if (this.props.language !== this.state.language) {
      this.setState({ language: this.props.language }, () => {
        //console.log("language_state:", this.state.language);
      });
      // console.log("all_languages: ", this.props.language);
    }
  }

  componentDidMount() {
    const categories = this.props.categories && this.props.categories;
    const languages = this.props.language && this.props.language;
    //const publishers = this.props.publisherAll && this.props.publisherAll;

    //console.log("all_categories: ", categories);
    //console.log("all_languages: ", languages);
  }

  onCategoryChange(event) {
    // console.log("cat_change:", event.target.value);
    if (event.target.checked == true) {
      //if (event.target.value) {
      this.setState({ id_cat: event.target.value }, () => {
        this.setState({ cat_error: "" });
        this.loadPublishers();
      });
    } else {
      this.setState({ id_cat: 0 }, () => {
        this.setState({ cat_error: "" });
        this.loadPublishers();
      });
    }
  }

  onLanguageChange(event) {
    var lang_id = 0;
    if (event.target.checked == true) {
      if (event.target.value !== "lang_all") {
        //console.log("filter languages");
        this.setState({ id_lan: event.target.value }, () => {
          this.setState({ lang_error: "" });
        });
      } else {
        //console.log("all languages");
        this.setState({ id_lan: 0 }, () => {
          this.setState({ lang_error: "" });
        });
      }
    } else {
      this.setState({ id_lan: 0 }, () => {
        this.setState({ lang_error: "" });
      });
    }
    //console.log("Lang_id: ", event.target.value);
    //console.log("Lang_id: ", this.state.id_lan);
  }
  loadCategories() {
    //console.log("loadCategories");
    if (this.state.id_cat.length > 0 && this.state.id_cat !== "all") {
      //console.log("loadCategories inside");
      var categories = lodash.filter(this.props.categories, [
        "cat_id",
        parseInt(this.state.id_cat)
      ]);
      //console.log("categories::::::", categories);
      var publishers = this.loadPublishers(
        this.state.id_cat,
        this.state.id_lan
      );
      if (publishers.length > 0) {
        //console.log("categories", categories);
        return categories;
      } else {
        // console.log("no publishers");
      }
    } else {
      //console.log("else_categories", this.props.categories);
      return this.props.categories && this.props.categories;
    }
  }

  loadPublishers(cat_id, lang_id) {
    // var language_id = "";
    var Category_id = parseInt(cat_id);
    //var Category_id = cat_id;
    //console.log("loadPublishers_lang_id: ", lang_id);
    //console.log("loadPublishers_cat_id: ", Category_id);
    // if(cat_id == null || cat_id == ""){
    //     Category_id = "";
    // }
    // if(lang_id == null || lang_id == ""){
    //     language_id = "";
    // }

    var publishers = lodash.filter(this.state.publishers, [
      "category_id",
      Category_id
    ]);
    //console.log("publishers_after_cat_id::", publishers);
    if (publishers.length > 0 && lang_id.length > 0) {
      publishers = lodash.filter(publishers, [
        "language_id",
        parseInt(lang_id)
      ]);
      //console.log("publishers_after_lang_id :: ", publishers);
    }
    //console.log("load_publishers", publishers);
    return publishers;
  }

  handleOnClick = event => {};
  handleClick() {}

  renderRows = rows => {
    const { publishers } = this.props;
    if (publishers) {
      return publishers.map(row => {
        return (
          <tr
            key={row.id}
            onClick={() => {
              localStorage.setItem("publisher name:", row.name);
              localStorage.setItem("publisher id:", row.id);
              toastr.success("you selected:", row.name);
            }}
          >
            <td>{row.id}</td>
            <td>{row.name}</td>
          </tr>
        );
      });
    }
  };

  render() {
    const { publisherFilter } = this.props;

    return (
      <div className="animated fadeIn">
        <AppHeader>
          <Header />
        </AppHeader>

        <Container className="mt-5">
          <Row>
            <Col lg="3">
              <div className="filter_list">
                <div className="mb-4">
                  <h5>Filter by Category</h5>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          defaultChecked
                          name="category"
                          value="all"
                          id="all"
                          onClick={this.onCategoryChange.bind(this)}
                        />
                        <label className="custom-control-label" htmlFor="all">
                          All
                        </label>
                      </div>
                    </li>
                    {this.props.categories &&
                      this.props.categories.map((category1, index) => (
                        <li className="list-group-item" key={index}>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              name="category"
                              value={category1.cat_id}
                              id={category1.cat_id}
                              onClick={this.onCategoryChange.bind(this)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={category1.cat_id}
                            >
                              {category1.cat_name}
                            </label>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h5>Filter by Language</h5>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          name="language"
                          defaultChecked
                          className="custom-control-input"
                          value="lang_all"
                          id="lang_all"
                          onClick={this.onLanguageChange.bind(this)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="lang_all"
                        >
                          All
                        </label>
                      </div>
                    </li>
                    {this.props.language &&
                      this.props.language.map((lang, index) => (
                        <li className="list-group-item" key={index}>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              name="language"
                              className="custom-control-input"
                              value={lang.id}
                              id={lang.name}
                              onClick={this.onLanguageChange.bind(this)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={lang.name}
                            >
                              {lang.name}
                            </label>
                          </div>
                        </li>
                      ))}
                  </ul>
                  {/* <Link className='btn btn-primary'> Proceed to dashboard</Link> */}
                </div>
              </div>
            </Col>
            <Col lg="9">
              <div className="publisher_list">
                {this.loadCategories(1, 2) &&
                  this.loadCategories(1, 2).map((cats, index) => (
                    <Row className="mb-4" key={index}>
                      <Col>
                        <h2 className="mb-4 w-700 cate_title">
                          {cats.cat_name}
                        </h2>
                        <div className="publisher-list">
                          <ul className="pl_main">
                            {this.loadPublishers(
                              cats.cat_id,
                              this.state.id_lan
                            ) &&
                              this.loadPublishers(
                                cats.cat_id,
                                this.state.id_lan
                              ).map((pubs, index) => (
                                <li className="pl-item" key={index}>
                                  <div className="pl-item__wrap">
                                    <div className="pl-item__img">
                                      <img
                                        src={require(`../../assets/img/${pubs.image}`)}
                                        className="img-fluid"
                                      />
                                      <Button
                                        color="dark"
                                        className="addtoCart"
                                        onClick={() =>
                                          this.props.addToCart(
                                            pubs.price_id,
                                            pubs.id,
                                            pubs.category_id
                                          )
                                        }
                                      >
                                        Add to cart
                                      </Button>
                                    </div>
                                    <h5 className="pl-item__price">
                                      <CurrencyFormat
                                        value={pubs.price}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"Rs. "}
                                        suffix={".00"}
                                      />
                                    </h5>
                                    <h4>{pubs.name}</h4>
                                    <p>{pubs.lang_name}</p>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
function mapStateToProps({
  categories,
  language,
  publisher,
  publisherAll,
  publisherPrice
}) {
  return { categories, language, publisher, publisherAll, publisherPrice };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCategoris,
      getLanguage,
      getAllPublishers,
      getPrice,
      listpublisher,
      addToCart
    },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
);
