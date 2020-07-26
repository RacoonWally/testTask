import React, {Component} from "react";
import {connect} from "react-redux";


import {
    fetchPeople,
    sortedPeoplesStr,
    sortedPeoplesInt
} from '../../actions'

import Person from '../../componetns/person'


class People extends Component {

    state = {};

    componentDidMount() {
        this.props.fetchPeople();
        // this.props.fetchAllPeople();
    }


    getData = (item, clicked = false) => {

        console.log(clicked);
        this.setState({"item": item});
        this.setState({"clicked": clicked});
        console.log("clicked");
    };

    renderCaption = (array) => {


        const {sortedPeoplesInt, sortedPeoplesStr} = this.props;
        return (
            <tr>
                <th uniqkey={"id"} onClick={(e) => {
                    const id = e.target.getAttribute('uniqkey');
                    const sorted = this.props.sorted;
                    sortedPeoplesInt(id, array, sorted)
                }}>Id
                </th>
                <th uniqkey={"firstName"} onClick={(e) => {
                    const id = e.target.getAttribute('uniqkey');
                    const sorted = this.props.sorted;
                    sortedPeoplesStr(id, array, sorted)
                }}>First Name
                </th>
                <th uniqkey={"lastName"} onClick={(e) => {
                    const id = e.target.getAttribute('uniqkey');
                    const sorted = this.props.sorted;
                    sortedPeoplesStr(id, array, sorted)
                }}>Last Name
                </th>
                <th uniqkey={"email"} onClick={(e) => {
                    const id = e.target.getAttribute('uniqkey');
                    const sorted = this.props.sorted;
                    sortedPeoplesStr(id, array, sorted)
                }}>Email
                </th>
                <th uniqkey={"phone"} onClick={(e) => {
                    const id = e.target.getAttribute('uniqkey');
                    const sorted = this.props.sorted;
                    sortedPeoplesStr(id, array, sorted)
                }}>Phone
                </th>
            </tr>
        )
    };

    renderInfo = () => {
        const {item = {}, clicked = false} = this.state;
        const {id, firstName, lastName, email, description, phone, address = {}} = item;
        const {city, state, streetAddress, zip} = address;
        //

            if (clicked){
                return ( <div>
                        <div>
                            <p>id: {id}</p>
                            <p>Name: {firstName}</p>
                            <p>Last Name: {lastName}</p>
                            <p>Email: {email}</p>
                            <p>Description: {description}</p>
                            <p>Phone: {phone}</p>
                            <p>City: {city}</p>
                            <p>State: {state}</p>
                            <p>Street Address: {streetAddress}</p>
                            <p>ZipCode: {zip}</p>
                        </div>
                    </div>
                )
            }

    };


    render() {
        const {people} = this.props.people;

        const result = [];
        for (let key in people) {
            result.push(people[key])
        }


        return (
            //Person
            <div>
                <div>
                    <table>
                        <tbody>
                        {this.renderCaption(result)}
                        {result.map((item, key) => {
                            return (<Person key={key} data={item} getData={this.getData}/>)
                        })}
                        </tbody>
                    </table>
                    {this.renderInfo(this.state.clicked)}
                    <button onClick={this.loadAllPeople}>click on me</button>
                    <button onClick={this.loadAllPeople}>click on me</button>
                </div>
            </div>
        )
    }


}


const mapStateToProps = (state) => {
    const {people, sortedPeoplesStr, sortedPeoplesInt} = state;
    return {
        people: people,
        sortedPeoplesStr: sortedPeoplesStr,
        sortedPeoplesInt: sortedPeoplesInt,
        sorted: people.sorted

    }
};

const mapDispatchToProps = {
    fetchPeople,
    sortedPeoplesStr,
    sortedPeoplesInt

};

export default connect(mapStateToProps, mapDispatchToProps)(People);

