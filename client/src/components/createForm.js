import React from 'react';
import ModalPopover from './modalPopover.js';
import { Modal, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { saveForm } from '../store/actions.js';
import { bindActionCreators } from 'redux';

export class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            questionSet: [],
            name: ''
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
        const { name, questionSet } = this.state;
        let formData = { name, questionSet, created_at: new Date() };
        this.props.saveForm(formData);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    render() {
        return (
            <Form className="create-form">
                <FormGroup controlId="formBasicEmail">
                    <Label><h2>Create Form</h2></Label>
                </FormGroup>
                <FormGroup controlId="formBasicEmail">
                    <Label>Form Name<span className="text-danger">*</span></Label>
                    <Input type="name" value={this.state.name} placeholder="Enter form name here..." onChange={(e) => this.handleChange(e)} />
                </FormGroup>
                {/* {
                    this.state.questionSet.length !== 0 &&
                    this.state.questionSet.map(question => {
                        console.log("---", question)
                    })
                } */}
                <Button className="buttons p-1" disabled={this.state.name.length === 0} color="primary" onClick={() => this.toggle()}>Add Question</Button>
                <Modal isOpen={this.state.modal} toggle={() => this.toggle()} >
                    <ModalPopover getQuestion={this.getQuestionSet} toggle={() => this.toggle()} />
                </Modal>
                <Button className="buttons ml-2 p-1" disabled={this.state.name.length === 0} color="secondary" onClick={() => this.save()}>Save</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formData: state.formReducer.formData
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
