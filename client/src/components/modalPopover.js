import React from 'react';
import DocumentInput from './mulltiChoice.js';
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
            multichoice: [],
            choices: {}
        }
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


    getMultiChoice(e) {
        const name = e.target.name;
        const value = e.target.value;
        const { choices } = this.state;
        choices[name] = value;
        this.setState({ choices });

    }

    add() {
        const { multichoice } = this.state;
        const value = multichoice.concat(<DocumentInput getMultiChoice={(e) => this.getMultiChoice(e)} index={multichoice.length} />);
        this.setState({ multichoice: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let { questionSet, choices } = this.state;
        questionSet['choices'] = choices;
        this.props.getQuestion(questionSet);
        let resetQuestionSet = {
            question: '',
            ansType: 'Text'
        }
        this.setState({ questionSet: resetQuestionSet });
        this.props.toggle();
    }

    componentDidMount() {
        const { multichoice } = this.state;
        const value = multichoice.concat(<DocumentInput getMultiChoice={(e) => this.getMultiChoice(e)} index={0} />);
        this.setState({ multichoice: value });
    }

    render() {
        const documents = this.state.multichoice.map((Element, i) => {
            return Element;
        });
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
                                    <DropdownItem name="ansType" onClick={() => this.handleChange('Multichoice Checkbox')} > Multichoice Checkbox</DropdownItem>
                                    <DropdownItem name="ansType" onClick={() => this.handleChange('Single Select radio')} > Single Select radio</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                        {
                            (this.state.selectedType === 'Multichoice Checkbox') &&
                            <>
                                <Button className="mb-1 choice-button" onClick={() => this.add()}>Add choice</Button>
                                <div className="inputs">
                                    {documents}
                                </div>
                            </>
                        }
                        <Button disabled={this.state.questionSet.question.length === 0} color="primary mr-2" type="submit">Add Button</Button>
                        <Button color="secondary" onClick={() => this.props.toggle()}>Cancel</Button>
                    </Form>
                </ModalBody>
            </>
        );
    }
}

export default ModalPopover;
