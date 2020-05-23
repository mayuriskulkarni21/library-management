import React from 'react';
import { Input, Form, FormGroup, Label } from 'reactstrap';
import Axios from 'axios';

export default class ShowWholeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        }
    }

    componentDidMount() {
        console.log("props:", this.props);
        const { pathname } = this.props.history.location;
        console.log("pathname:", pathname)
        Axios.get(`http://localhost:5000/api${pathname}`)
            .then(res => {
                this.setState({ formData: res.data.form })
            })
            .catch(e => {
                console.log(e)
            })
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

    render() {
        const { formData } = this.state;
        return (
            formData !== {} ?
                <Form className="create-form">
                    <FormGroup controlId="formBasicEmail">
                        <div className="text-center	"><Label className="font-weight-bold">{formData.name}</Label> <hr /></div>
                    </FormGroup>
                    {
                        formData.questionSet && formData.questionSet.length !== 0 &&
                        formData.questionSet.map((question, i) => {
                            return (
                                this.showForm(question, i)
                            )
                        })
                    }
                </Form>
                :
                <></>
        )
    }
}