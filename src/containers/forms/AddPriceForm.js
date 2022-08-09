import React, { Component } from 'react';
import { Button, FormGroup, Input, FormText, Label } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createPrice } from "../../actions/price";
import { getPublisherList } from "../../actions/publishers";
import { getCategoriesList } from "../../actions/categories";


class AddPriceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitting: this.props.processing,
            publisher: [],
            id_cat: "",
            id_pubs: "",
            cat_error: "",
            pubs_error: "",
            publisher_error: "",
            categories_error: "",
        };

    };

    componentDidMount() {
        this.props.getPublisherList();
        this.props.getCategoriesList();

    }


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
            // this.props.selection(this.state.id_cat, this.state.id_pubs);
            // localStorage.setItem('id_cat', this.state.id_cat);
        }

    }



    onCreatePrice(values) {
        const cat_id=this.state.id_cat
        const pub_id=this.state.id_pubs
        const price=values.price
        const obj={
            cat_id,
            pub_id,
            price
        }
        console.log(obj)
        this.props.createPrice(obj);
    }

    render() {
        const { handleSubmit, submitting } = this.props;


        return (
            <div>
                <form onSubmit={handleSubmit(this.onCreatePrice.bind(this))}>
                    <div class="form-group"></div>
                    <FormGroup>
                        <Label for="exampleSelect">Publisher</Label>
                        <Input
                            //type="select" name="select" id="exampleSelect">
                            onChange={this.onPublisherChange.bind(this)}
                            type="select"
                            name="publisher_select"
                            id="publisher_select"
                            defaultValue="0"
                        >
                            <option value="0" disabled>
                                Select Publisher
                      </option>
                            {this.props.publishers &&
                                this.props.publishers.map((pubs, index) => (
                                    <option key={index} value={pubs.pub_id}>
                                        {pubs.pub_name}
                                    </option>
                                ))}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleSelect">Category</Label>
                        <Input
                            //type="select" name="select" id="exampleSelect">
                            onChange={this.onCategoryChange.bind(this)}
                            type="select"
                            name="category_select"
                            id="category_select"
                            defaultValue="0"
                        >
                            <option value="0" disabled>
                                Select category
                        </option>
                            {this.props.categories &&
                                this.props.categories.map((category1, index) => (
                                    <option key={index} value={category1.cat_id}>
                                        {category1.cat_name}
                                    </option>
                                ))}

                        </Input>
                    </FormGroup>
                    {/* <div class="form-group">
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
                    </div> */}
                    {/* <Field component={renderField} type="text" label="Title" name="title" />  */}
                    <FormGroup className="mb-3">
                        <Field component={renderField} type="number" label="Price" name="price" />

                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Button color="success" disabled={submitting} type="submit" style={{ float: "right", marginTop: "10px" }}>Submit</Button>{" "}
                        <Button color="danger" style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>Discard</Button>{" "}
                    </FormGroup>

                </form>
            </div>
        );
    }
}
const validate = values => {
    const errors = {};
    if (!values.price) {
        errors.price = "Please enter Price ";
    }
    return errors;
}

const renderField = ({
    input,
    label,
    type,
    icon,
    meta: { touched, error, warning }
}) => (
        <FormGroup className="mb-3">
            <Label>{label}</Label>
            <Input {...input} type={type} placeholder={label} />
            {touched && ((error && <FormText color="danger">{error}</FormText>))}
        </FormGroup>
    )

function mapStateToProps({ processing, SelectedMessage,publishers,categories }) {
    return {
        processing,
        SelectedMessage,
        publishers,
        categories
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createPrice,
        getPublisherList,
        getCategoriesList
    }, dispatch);
}

let FormData = reduxForm({ validate, form: 'AddPriceForm' })(AddPriceForm);
FormData = connect(mapStateToProps, mapDispatchToProps)(FormData);
export default FormData;
