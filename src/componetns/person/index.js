import React, {Component} from "react";

class Person extends Component {

    render() {

        const {id, firstName, lastName, email, phone} = this.props.data;

        return (
            <tr onClick={(e) => {
                this.props.getData(this.props.data, true);
            }}>
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{phone}</td>
            </tr>
        );
    }


};

export default Person;
