import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
    MIN_API_URL,
    NORMAL_API_URL
} from '../../service/apiList';

import {
    fetchPeople,
    sortedPeoplesStr,
    sortedPeoplesInt,
    findRecord,
    addRecord,
    // loadNextPage
} from '../../actions';
import Person from '../../componetns/person';
import ButtonsBar from "../../componetns/buttonsBar";
import Loading from "../../componetns/loading";


class People extends Component {

    state = {newRecord: {}};


    componentDidMount() {
        this.props.fetchPeople(MIN_API_URL, false);
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
            return (
                <Fragment>
                    <div className="d-flex flex-column border border border-danger m-3">
                        <div className="d-flex flex-row">
                            <div><p className="p-2">id: {id}</p></div>
                            <div><p className="p-2">Name: {firstName}</p></div>
                            <div><p className="p-2">Last Name: {lastName}</p></div>
                            <div><p className="p-2">Email: {email}</p></div>
                        </div>
                        <div><p className="p-2">Description: {description}</p></div>
                        <div className="d-flex flex-row">
                            <div><p className="p-2">Phone: {phone}</p></div>
                            <div><p className="p-2">City: {city}</p></div>
                            <div><p className="p-2">State: {state}</p></div>
                            <div><p className="p-2">Street Address: {streetAddress}</p></div>
                            <div><p className="p-2">ZipCode: {zip}</p></div>
                        </div>

                    </div>
                </Fragment>
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
        const array = this.props.people.people;
        const {findRecord} = this.props;
        return (
            <Fragment>
                <div className="p-3">
                    <input type="text" placeholder="Введите строку" value={this.state.value}
                           onChange={e => this.handleChange(e)}/>
                    <button className="ml-3 btn btn-primary" onClick={(e) => {
                        findRecord(text, array)
                    }}>Найти
                    </button>
                </div>
            </Fragment>
        )
    };

    addNewRecord = () => {
        const {firstName, lastName, email, phone, visionFlag} = this.state;
        const id = parseInt(this.state.id);
        const item = {
            id, firstName, lastName, email, phone
        };
        const {people} = this.props.people;
        const newResult = [];
        for (let key in people) {
            newResult.push(people[key])
        }
        newResult.unshift(item);

        if (visionFlag) {
            return (
                <div className="d-flex flex-column">
                    <div className="pt-3 pl-3 d-flex row">
                        <div className="pt-1 pl-3">
                            <input type="text" placeholder="ID" value={this.state.newRecord.id}
                                   onChange={(e) => this.handleChangeAddFunc(e, "id")} required/>
                        </div>
                        <div className="pt-1 pl-3">
                            <input type="text" placeholder="Имя" value={this.state.newRecord.firstName}
                                   onChange={(e) => this.handleChangeAddFunc(e, "firstName")} required/>
                        </div>
                        <div className="pt-1 pl-3">
                            <input type="text" placeholder="Фамилия" value={this.state.newRecord.lastName}
                                   onChange={(e) => this.handleChangeAddFunc(e, "lastName")} required/>
                        </div>
                        <div className="pt-1 pl-3">
                            <input type="text" placeholder="Email" value={this.state.newRecord.email}
                                   onChange={(e) => this.handleChangeAddFunc(e, "email")} required/>
                        </div>
                        <div className="pt-1 pl-3">
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
        const {addRecord} = this.props;
        if (id !== "" && id !== undefined &&
            firstName !== "" && firstName !== undefined &&
            lastName !== "" && lastName !== undefined &&
            email !== "" && email !== undefined &&
            phone !== "" && phone !== undefined) {
            return (
                <div className="pl-3 pt-1">
                    <button className="btn btn-info" onClick={(e) => {
                        addRecord(newResult)
                    }}>
                        Добавить в Таблицу
                    </button>
                </div>
            )
        }
    };


    render() {
        const {loading} = this.props;
        const result = [];
        const {visionFlag} = this.state;
        // const {people, findedPeople, pageContent} = this.props.people;
        const {people, findedPeople} = this.props.people;
        // let resultPage = [];


        if (findedPeople !== undefined) {
            for (let key in findedPeople) {
                result.push(findedPeople[key])
            }
        }
            // else if (pageContent !== undefined) {
            //     for (let key in pageContent) {
            //         resultPage.push(pageContent[key])
            //     }
        // }
        else {
            for (let key in people) {
                result.push(people[key])
            }
            // resultPage = [];
            //
            // this.props.loadNextPage(1, this.result)
        }


        // const step = 30;
        // const pagesCount = Math.ceil(this.result.length / step);
        //
        // const pagesList = [];
        //
        // for (let i = 1; i <= pagesCount; i++) {
        //     pagesList.push(i)
        // }

        if (loading) {
            return (
                <div>
                    <Loading/>
                </div>
            )
        } else
            return (
                <div>
                    <div>
                        {this.addNewRecord()}
                        <div>
                            {this.searchRecord()}
                        </div>
                        <div>
                            <button className="btn btn-primary m-3" onClick={(e) => {
                                this.setState({"visionFlag": !visionFlag})
                            }}> {!visionFlag ? "Добавить" : "Скрыть"}
                            </button>
                        </div>

                        <table className="container-fluid ml-3">
                            <tbody>
                            {this.renderCaption(result)}
                            {result.map((item, key) => {
                                return (<Person key={key} data={item} getData={this.getData}/>)
                            })}
                            </tbody>
                        </table>
                        {/*<div>*/}
                        {/*    {pagesList.map((item, key) => {*/}
                        {/*        return (<ButtonsBar key={key} data={item} array={this.result}/>)*/}
                        {/*    })}*/}
                        {/*</div>*/}
                        {this.renderInfo(this.state.clicked)}
                        <div className="d-flex flex-row">
                            <div>
                                <button className="m-3 btn btn-outline-primary" onClick={(e) => this.props.fetchPeople(MIN_API_URL)}>Минимальные данные</button>
                            </div>
                            <div>
                                <button className="m-3 btn btn-outline-success" onClick={(e) => this.props.fetchPeople(NORMAL_API_URL)}>Все данные</button>
                            </div>
                        </div>

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
        loading: people.loading,
        findRecord: findRecord,
        addRecord: addRecord,
        pageContent: pageContent,
        // loadNextPage: loadNextPage
    }
};

const mapDispatchToProps = {
    fetchPeople,
    sortedPeoplesStr,
    sortedPeoplesInt,
    findRecord,
    addRecord,
    // loadNextPage
};

export default connect(mapStateToProps, mapDispatchToProps)(People);

