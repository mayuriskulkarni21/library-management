import React from 'react';
import { connect } from 'react-redux';
import { getQuestionsSet } from '../store/actions.js';
import { bindActionCreators } from 'redux';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ModalHeader,
    ModalBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

class ModalPopover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            questionSet: {
                question: '',
                ansType: 'Text'
            },
            selectedType: 'Text',
            multichoice: []
        }
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    toggleDropdown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };

    handleChange(e) {
        let questionSet = this.state.questionSet;
        if (typeof (e) === 'string') {
            questionSet.ansType = e;
            this.setState({ selectedType: e });
        } else {
            e.preventDefault();
            questionSet.question = e.target.value;
        }
        this.setState({ questionSet });
    }

    handleAnswer() {
        const { selectedType } = this.state;
        if (selectedType === 'Multichoice Checkbox') {
            return (
                <FormGroup>
                    <Input type="text" name="checkbox" value={this.state.question} onChange={(e) => this.handleChange(e)} placeholder="Enter question here..." />
                </FormGroup>
            )
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let { questionSet } = this.state;
        this.props.getQuestion(questionSet);
        let resetQuestionSet = {
            question: '',
            ansType: 'Text'
        }
        this.setState({ questionSet: resetQuestionSet });
        this.props.toggle();
    }

    render() {
        return (
            <>
                < ModalHeader toggle={() => this.props.toggle()}>Add Questions</ModalHeader >
                <ModalBody>
                    <Form onSubmit={(e) => this.handleSubmit(e)} >
                        <FormGroup>
                            <Label>Question / Title<span className="text-danger">*</span></Label>
                            <Input type="text" name="question" value={this.state.question} onChange={(e) => this.handleChange(e)} placeholder="Enter question here..." />
                        </FormGroup>
                        <FormGroup>
                            <Label >Answer Type<span className="text-danger">*</span></Label>
                            <Dropdown disabled={this.state.questionSet.question.length === 0} isOpen={this.state.dropdownOpen} toggle={() => this.toggleDropdown()}>
                                <DropdownToggle caret>{this.state.questionSet.ansType}</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem name="ansType" onClick={() => this.handleChange('Text')} >Text</DropdownItem>
                                    <DropdownItem name="ansType" onClick={() => this.handleChange('Multichoice Checkbox')} > Multichoice</DropdownItem>
                                    <DropdownItem name="ansType" onClick={() => this.handleChange('Single Select radio')} > Single Select radio</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                        {!this.state.questionSet.question.length === 0 && this.handleAnswer()}
                        <Button disabled={this.state.questionSet.question.length === 0} color="primary mr-2" type="submit">Add Button</Button>
                        <Button color="secondary" onClick={() => this.props.toggle()}>Cancel</Button>
                    </Form>
                </ModalBody>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        formDetails: state.formDetails
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getQuestionsSet: bindActionCreators(getQuestionsSet, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalPopover);
