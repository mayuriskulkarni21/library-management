import React from 'react';
import { Input } from 'reactstrap';

export default class DocumentInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: ''
        }
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ inputVal: value });
        this.props.getMultiChoice(e)
    }

    render() {
        const inputName = `choice${this.props.index}`;
        return (
            <Input
                type="text"
                className="mb-1"
                name={inputName}
                value={this.state.inputVal}
                key={this.props.index}
                onChange={(e) => this.handleChange(e)}
            />
        )
    }
}