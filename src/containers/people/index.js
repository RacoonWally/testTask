import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
    MIN_API_URL,
    NORMAL_API_URL
} from '../../service/apiList'

import {
    fetchPeople,
    sortedPeoplesStr,
    sortedPeoplesInt,
    findRecord,
    addRecord,
    loadNextPage
} from '../../actions'

import Person from '../../componetns/person'
import ButtonsBar from "../../componetns/buttonsBar";


class People extends Component {

    state = {newRecord: {}};
    result = [];

    componentDidMount() {
        this.props.fetchPeople(MIN_API_URL);
    }

    getData = (item, clicked = false) => {
        this.setState({"item": item});
        this.setState({"clicked": clicked});
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

        if (clicked) {
            return (<div>
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

    handleChange(event) {
        this.setState({"value": event.target.value});
    }

    handleChangeAddFunc(event, param) {
        this.setState({[param]: event.target.value});
    }

    searchRecord = () => {
        const text = this.state.value;
        const array = this.props.people;
        const {findRecord} = this.props;
        return (
            <Fragment>
                <input type="text" placeholder="Введите строку" value={this.state.value}
                       onChange={e => this.handleChange(e)}/>
                <button onClick={(e) => {
                    findRecord(text, array)
                }}>Найти
                </button>
            </Fragment>
        )
    };

    addNewRecord = () => {
        const {id, firstName, lastName, email, phone, visionFlag} = this.state;
        const item = {
            id, firstName, lastName, email, phone
        };
        const {addRecord} = this.props;

        const {people} = this.props.people;
        const newResult = [];
        for (let key in people) {
            newResult.push(people[key])
        }
        newResult.unshift(item);

        if (visionFlag) {
            return (
                <div>
                    <div>
                        <div>
                            <input type="text" placeholder="ID" value={this.state.newRecord.id}
                                   onChange={(e) => this.handleChangeAddFunc(e, "id")} required/>
                        </div>
                        <div>
                            <input type="text" placeholder="Имя" value={this.state.newRecord.firstName}
                                   onChange={(e) => this.handleChangeAddFunc(e, "firstName")} required/>
                        </div>
                        <div>
                            <input type="text" placeholder="Фамилия" value={this.state.newRecord.lastName}
                                   onChange={(e) => this.handleChangeAddFunc(e, "lastName")} required/>
                        </div>
                        <div>
                            <input type="text" placeholder="Email" value={this.state.newRecord.email}
                                   onChange={(e) => this.handleChangeAddFunc(e, "email")} required/>
                        </div>
                        <div>
                            <input type="text" placeholder="Телефон" value={this.state.newRecord.phone}
                                   onChange={(e) => this.handleChangeAddFunc(e, "phone")} required/>
                        </div>
                    </div>
                    {this.checkedInputs(newResult)}
                </div>
            )
        }

    };

    checkedInputs = (newResult) => {
        const {id, firstName, lastName, email, phone} = this.state;
        if (id !== "" && id !== undefined &&
            firstName !== "" && firstName !== undefined &&
            lastName !== "" && lastName !== undefined &&
            email !== "" && email !== undefined &&
            phone !== "" && phone !== undefined) {
            return (
                <div>
                    <button onClick={(e) => addRecord(newResult)}>
                        Добавить в Таблицу
                    </button>
                </div>
            )
        }
    };


    render() {
        const {visionFlag} = this.state;
        const {people, findedPeople, pageContent} = this.props.people;
        const resultPage = [];


        if (findedPeople !== undefined) {
            for (let key in findedPeople) {
                this.result.push(findedPeople[key])
            }
        } else if (pageContent !== undefined) {
            for (let key in pageContent) {
                resultPage.push(pageContent[key])
            }
        } else {
            for (let key in people) {
                this.result.push(people[key])
            }
            this.props.loadNextPage(1, this.result)
        }


        const step = 30;
        const pagesCount = Math.ceil(this.result.length / step);

        const pagesList = [];

        for (let i = 1; i <= pagesCount; i++) {
            pagesList.push(i)
        }


        return (
            <div>
                <div className="container-fluid">
                    {this.addNewRecord()}
                    <div>
                        {this.searchRecord()}
                    </div>
                    <div>
                        <button onClick={(e) => {
                            this.setState({"visionFlag": !visionFlag})
                        }}>Добавить
                        </button>
                    </div>

                    <table>
                        <tbody>
                        {this.renderCaption(this.result)}
                        {resultPage.map((item, key) => {
                            return (<Person key={key} data={item} getData={this.getData}/>)
                        })}
                        </tbody>
                    </table>
                    <div>
                        {pagesList.map((item, key) => {
                            return (<ButtonsBar key={key} data={item} array={this.result}/>)
                        })}
                    </div>
                    {this.renderInfo(this.state.clicked)}
                    <button onClick={(e) => this.props.fetchPeople(MIN_API_URL)}>Минимальные данные</button>
                    <button onClick={(e) => this.props.fetchPeople(NORMAL_API_URL)}>Все данные</button>
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    const {people, sortedPeoplesStr, sortedPeoplesInt, findRecord, findedPeople, addRecord, pageContent} = state;
    return {
        findedPeople: findedPeople,
        people: people,
        sortedPeoplesStr: sortedPeoplesStr,
        sortedPeoplesInt: sortedPeoplesInt,
        sorted: people.sorted,
        findRecord: findRecord,
        addRecord: addRecord,
        pageContent: pageContent,
        loadNextPage: loadNextPage
    }
};

const mapDispatchToProps = {
    fetchPeople,
    sortedPeoplesStr,
    sortedPeoplesInt,
    findRecord,
    addRecord,
    loadNextPage
};

export default connect(mapStateToProps, mapDispatchToProps)(People);

