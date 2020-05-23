import React from 'react';
import { connect } from 'react-redux';
import {
    ModalHeader,
    ModalBody,
    Table,
} from 'reactstrap';

export class ShowFormList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.formModal
        }
        this.renderTableData = this.renderTableData.bind(this)
    }

    showForm(e, _id) {
        e.preventDefault();
        this.props.history.push(`/form/${_id}`);
    }

    renderTableData() {
        return this.props.formList && this.props.formList.map((form, index) => {
            const { _id, name, created_at } = form;
            return (
                <tr key={_id}>
                    <td>{name}</td>
                    <td><a href={``} onClick={(e) => { this.showForm(e, _id) }} >{`/form/${_id}`}</a></td>
                    <td>{created_at}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            < >
                < ModalHeader toggle={() => this.props.toggle()}>Form List</ModalHeader >
                <ModalBody>
                    <Table id='form-list'>
                        <thead>
                            <tr>
                                <th>Form Name</th>
                                <th>Form URL</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </Table>
                </ModalBody>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formList: state.formReducer.formList
    }
}

export default connect(mapStateToProps)(ShowFormList);
