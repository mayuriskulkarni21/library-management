import React from 'react';
// import { Form } from 'react-bootstrap';
import ModalPopover from './modalPopover.js';
import { Modal, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { saveForm } from '../store/actions.js';
import { bindActionCreators } from 'redux';

class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            questionSet: [],
            formName: ''
        }
        this.getQuestionSet = this.getQuestionSet.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    getQuestionSet(question) {
        let { questionSet } = this.state;
        questionSet.push(question);
        this.setState({ questionSet });
    }

    save() {
        console.log("SAVE", this.props);
        const { formName, questionSet } = this.state;
        let formData = { formName, questionSet };
        this.props.saveForm(formData);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ formName: e.target.value });
    }

    render() {
        return (
            <Form className="create-form">
                <FormGroup controlId="formBasicEmail">
                    <Label><h2>Create Form</h2></Label>
                </FormGroup>
                <FormGroup controlId="formBasicEmail">
                    <Label>Form Name<span className="text-danger">*</span></Label>
                    <Input type="formName" value={this.state.formName} placeholder="Enter form name here..." onChange={(e) => this.handleChange(e)} />
                </FormGroup>
                {
                    this.state.questionSet.length !== 0 &&
                    this.state.questionSet.map(question => {
                        console.log("---", question)
                    })
                }
                <Button className="buttons p-1" disabled={this.state.formName.length === 0} color="primary" onClick={() => this.toggle()}>Add Question</Button>
                <Modal isOpen={this.state.modal} toggle={() => this.toggle()} >
                    <ModalPopover getQuestion={this.getQuestionSet} toggle={() => this.toggle()} />
                </Modal>
                <Button className="buttons ml-2 p-1" color="secondary" onClick={() => this.save()}>Save</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formDetails: state.formDetails
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveForm: bindActionCreators(saveForm, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateForm);
