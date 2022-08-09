import React, { Component } from 'react';
import { Button,FormGroup,Input,FormText, Label} from 'reactstrap';
import { reduxForm,Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createCategory } from "../../actions/categories";


class AddCategoryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitting: this.props.processing,           
        };

    };

    onCreateCategory(values) {      
        this.props.createCategory(values);       
    }

    render() {
        const { handleSubmit, submitting } = this.props;
       

        return (
            <div>
                <form onSubmit={handleSubmit(this.onCreateCategory.bind(this))}>
                    {/* <Field component={renderField} type="text" label="Title" name="title" />  */}
                    <FormGroup className="mb-3">
                    <Field component={renderField} type="text" label="Name" name="name" />
                  
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Button color="success" disabled={submitting} type="submit" style={{ float: "right", marginTop: "10px" }}>Add</Button>{" "}
                        <Button color="danger" style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>Close</Button>{" "}
                    </FormGroup>

                </form>
            </div>
        );
    }
}
const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = "Please enter the Category name";
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
            <Input {...input} type={type} placeholder={label}/>
            {touched && ((error && <FormText color="danger">{error}</FormText>))}
        </FormGroup>
    )

function mapStateToProps({ processing, SelectedMessage }) {
    return {
        processing,
        SelectedMessage

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createCategory
    }, dispatch);
}

let FormData = reduxForm({ validate,form: 'AddCategoryForm' })(AddCategoryForm);
FormData = connect(mapStateToProps, mapDispatchToProps)(FormData);
export default FormData;
 