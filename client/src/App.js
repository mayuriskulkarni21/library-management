import React, { Component } from 'react';
import CreateForm from './components/createForm.js';

class App extends Component {

    // componentDidMount() {
    //     axios.get(`https://jsonplaceholder.typicode.com/users`)
    //         .then(res => {
    //             const persons = res.data;
    //             this.setState({ persons });
    //         })
    // }

    render() {
        return (
            <div>
                <CreateForm />
            </div>
        );
    }
}
export default App;