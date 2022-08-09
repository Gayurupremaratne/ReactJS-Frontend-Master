import React, {Component} from "react";
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
import {getCategoris} from "../../actions/categories";
import {getLanguage} from "../../actions/language";
import {getAllPublishers, getPrice} from "../../actions/publishers";
import {listpublisher} from "../../actions/publishers";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {toastr} from "react-redux-toastr";
import Header from "../Header";
import {AppHeader} from "@coreui/react";
import {withRouter} from 'react-router'
const IMG_URL = "../../assets/img/";
let publishers = [];

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: this.props.images,
            id_cat: "",
            id_lan: "",
            cat_error: "",
            lang_error: "",
            publisher_error: "",
            publishers: []
        };
        this.onQuickClick = this
            .onQuickClick
            .bind(this);
        this.handleOnClick = this
            .handleOnClick
            .bind(this);
        this.handleClick = this
            .handleClick
            .bind(this);
    }

    componentDidMount() {
        this
            .props
            .getCategoris();
        this
            .props
            .getLanguage();
        this
            .props
            .selection();
        this
            .props
            .listpublisher();
    }

    onSubmit(e) {
        localStorage.setItem("form", e);
    }

    onQuickClick() {
        if (this.props.publisherPrice && publishers) {
            this.setState({publisher_error: ""});

            //pass to localstorage
            window.location.href = "/invoice";
        } else {
            if (this.props.publisherFilter) {
                this.setState({publisher_error: "please select publisher(s)"});
            }
            if (this.state.id_cat == null || this.state.id_cat.trim() == "") {
                this.setState({cat_error: "please select category"});
            }
            if (this.state.id_lan == null || this.state.id_lan.trim() == "") {
                this.setState({lang_error: "please select language"});
            }
        }
    }

    onCategoryChange(event) {
        this.setState({
            id_cat: event.target.value
        }, () => {
            this.setState({cat_error: ""});
            this.loadPublishers();
        });
    }

    onLanguageChange(event) {
        this.setState({
            id_lan: event.target.value
        }, () => {
            this.setState({lang_error: ""});
            this.loadPublishers();
        });
    }

    loadPublishers() {

        if (this.state.id_cat == null || this.state.id_cat.trim() == "") {
            this.setState({cat_error: "please select category"});
        } else if (this.state.id_lan == null || this.state.id_lan.trim() == "") {
            this.setState({lang_error: "please select language"});
        } else {
            this.setState({cat_error: ""});
            this.setState({lang_error: ""});
            this
                .props
                .selection(this.state.id_cat, this.state.id_lan);
            localStorage.setItem('id_cat', this.state.id_cat);
        }

    }

    handleOnClick = event => {};
    handleClick() {}

    renderRows = rows => {
        const {publishers} = this.props;
        if (publishers) {
            return publishers.map(row => {
                return (
                    <tr
                        key={row.id}
                        onClick={() => {
                        localStorage.setItem("publisher name:", row.name);
                        localStorage.setItem("publisher id:", row.id);
                        toastr.success("you selected:", row.name);
                    }}>
                        <td>
                            {row.id}
                        </td>
                        <td>
                            {row.name}
                        </td>
                    </tr>
                );
            });
        }
    };
    handleClick(e, s) {
        console.log("EEEE ", e)
    }
    handleClick(event) {
        if (event.target.checked == true) {
            publishers.push(event.target.value);

        } else {
            publishers.map((publisher, index) => {
                if (publishers[index] == event.target.value) {
                    publishers.splice(index, 1);
                } else {}
            });
        }
        localStorage.setItem("publishers", JSON.stringify(publishers));
        let publisher_list = JSON.parse(localStorage.getItem("publishers"));
        this
            .props
            .getPrice(publishers);

    };
    selectedList(publisherFilter) {
        return publisherFilter.map((data, i) => {
            let imgurl = require(`../../assets/img/${data.image}`);
            return (
                <Col xs="6" lg="3">
                    <div class="form-group checked1 form-check">
                        <input
                            type="checkbox"
                            name="publishers"
                            value={data.id}
                            class="form-check-input"
                            id={`publisher` + data.id}
                            onChange={(event) => this.handleClick(event)}/>
                        <label class="form-check-label" for={`publisher` + data.id}>
                            <img
                                src={require(`../../assets/img/${data.image}`)}
                                className="img-fluid"
                                alt={`publisher name`}/>
                        </label>
                    </div>
                </Col>
            );
        });
    }

    priceTable() {
        if (this.props.publisherPrice && this.props.publisherPrice.length > 0) {
            return (

                <Table
                    class="table table-bordered"
                    style={{
                    height: 300,
                    width: 500
                }}>
                    <thead>
                        <tr>
                            <th>Publisher</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.publisherPrice && this
                            .props
                            .publisherPrice
                            .map((Price, index) => (
                                <tr key={index}>
                                    <td>
                                        {Price.name}</td>
                                    <td>
                                        {Price.price}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>

            );
        }
    }

    render() {
        const {publisherFilter} = this.props;

        return (
            <div className="animated fadeIn">
                <AppHeader>
                    <Header/>
                </AppHeader>
                <Container className="mt-5">
                    <Card>
                        <CardBody>
                            <Row>

                                <Col xs="12" lg="6">
                                    <FormGroup>
                                        <Label for="exampleSelect">Category</Label>
                                        <Input
                                            onChange={this
                                            .onCategoryChange
                                            .bind(this)}
                                            type="select"
                                            name="category_select"
                                            id="category_select"
                                            defaultValue="0">
                                            <option value="0" disabled>
                                                Select Category
                                            </option>
                                            {this.props.categories && this
                                                .props
                                                .categories
                                                .map((category1, index) => (
                                                    <option key={index} value={category1.cat_id}>
                                                        {category1.cat_name}
                                                    </option>
                                                ))}
                                        </Input>
                                        <FormText color="danger">{this.state.cat_error}</FormText>
                                    </FormGroup>
                                </Col>
                                <Col xs="12" lg="6">
                                    <FormGroup>
                                        <Label for="exampleSelect">Language</Label>
                                        <Input
                                            onChange={this
                                            .onLanguageChange
                                            .bind(this)}
                                            type="select"
                                            name="language_select"
                                            id="language_select"
                                            defaultValue="0">
                                            <option value="0" disabled>
                                                Select Language
                                            </option>
                                            {this.props.language && this
                                                .props
                                                .language
                                                .map((lang, index) => (
                                                    <option key={index} value={lang.id}>
                                                        {lang.name}
                                                    </option>
                                                ))}
                                        </Input>
                                        <FormText color="danger">{this.state.lang_error}</FormText>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Label for="exampleSelect">Select Publishers</Label>
                                </Col>

                            </Row>
                            <div className="publisher_list">

                                <Row>
                                    {publisherFilter && this.selectedList(publisherFilter)}

                                </Row>
                                <FormText color="danger">{this.state.publisher_error}</FormText>
                            </div>

                            {this.priceTable(this)}
                            {< Button onClick = {
                                this.onQuickClick
                            }
                            color = "primary" > Next </Button>}
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}
function mapStateToProps({categories, language, publisher, publisherFilter, publisherPrice}) {
    return {categories, language, publisher, publisherFilter, publisherPrice};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCategoris,
        getLanguage,
        getAllPublishers,
        getPrice,
        listpublisher
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
