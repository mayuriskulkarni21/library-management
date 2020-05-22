import React from 'react';
import { connect } from 'react-redux';
import { saveForm, getFormList } from '../store/actions.js';
import { bindActionCreators } from 'redux';

class ShowFormList extends React.Component {
    render() {
        console.log("formList...", this.props.formList)
        return (
            <div></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formList: state.formReducer.formList
    }
}

export default connect(mapStateToProps)(ShowFormList);
