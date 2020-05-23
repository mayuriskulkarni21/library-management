import React from 'react';
import ModalPopover from './modalPopover.js';
import { Modal, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { saveForm, getFormList } from '../store/actions.js';
import { bindActionCreators } from 'redux';
import ShowFormList from './showFormList.js';

export class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            questionSet: [],
            name: '',
            // formData: {},
            productList: false,
            formModal: false,
            error: null,
            addQuestion: null
        }
        this.getQuestionSet = this.getQuestionSet.bind(this);
        this.showForm = this.showForm.bind(this);
        this.getMultiChoice = this.getMultiChoice.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    formList() {
        this.setState(prevState => ({
            formModal: !prevState.formModal
        }));
    }

    getQuestionSet(question) {
        let { questionSet } = this.state;
        questionSet.push(question);
        this.setState({ questionSet, addQuestion: true });
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

    getMultiChoice(choices) {
        let keys = Object.keys(choices);
        return keys.map((k, i) => {
            return (<div>
                <input type="checkbox" /><span>{'  '}{choices[k]}</span>
            </div >)
        })
    }

    showForm(question, i) {
        console.log("question:", question)
        let keyval = `answer${i}`;
        return (
            <FormGroup controlId="formBasicEmail">
                <span className="font-weight-bold">Q.</span><span>{'  '}{question.question}</span>
                {question.ansType === "Text" && <Input type="name" name={keyval} />}
                {question.ansType === "Multichoice Checkbox" && this.getMultiChoice(question.choices)}
                {question.ansType === "Single Select radio" && <><span>{'  '}</span><input type="radio" /></>}
            </FormGroup>
        )
    }

    getFormList() {
        this.props.getFormList();
        this.setState({ productList: true });
        this.formList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props && nextProps.formData && nextProps.formData !== this.props.formData) {
            this.setState({ error: nextProps.formData.error })
        }
    }

    render() {
        return (
            <Form className="create-form">
                <FormGroup controlId="formBasicEmail">
                    <Label><h2>Create Form</h2></Label>
                    {this.state.error === false &&
                        <p className="text-success">Form saved successfully!</p>}
                    {(this.state.addQuestion === true && this.state.error !== false) &&
                        <p className="text-success">Question added successfully!</p>}
                </FormGroup>
                <FormGroup controlId="formBasicEmail">
                    <Label>Form Name<span className="text-danger">*</span></Label>
                    <Input className="adjustWidth" type="name" value={this.state.name} placeholder="Enter form name here..." onChange={(e) => this.handleChange(e)} />
                </FormGroup>
                {
                    this.state.questionSet.length !== 0 &&
                    this.state.questionSet.map((question, i) => {
                        return (
                            this.showForm(question, i)
                        )
                    })
                }
                <div className="adjustWidth d-flex">
                    <Button className="buttons p-1 questions" disabled={this.state.name.length === 0} color="primary" onClick={() => this.toggle()}>Add Question</Button>
                    <Modal isOpen={this.state.modal} toggle={() => this.toggle()} >
                        <ModalPopover getQuestion={this.getQuestionSet} toggle={() => this.toggle()} />
                    </Modal>
                    <Button className="buttons ml-2 p-1 save" disabled={this.state.name.length === 0} color="secondary" onClick={() => this.save()}>Save</Button>
                </div>
                <Button className="buttons mt-2 p-1 adjustWidth" color="success" onClick={() => this.getFormList()}>Existing form list</Button>
                <Modal isOpen={this.state.formModal} toggle={() => this.formList()} >
                    <ShowFormList history={this.props.history} toggle={() => this.formList()} showForm={this.showForm} />
                </Modal>
                {/* {this.state.productList && <ShowFormList toggle={() => this.toggle()} />} */}
            </Form >
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
        getFormList: bindActionCreators(getFormList, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateForm);
