import {
    FETCH_PEOPLE_START,
    FETCH_PEOPLE_FAILURE,
    FETCH_PEOPLE_SUCCESS,
    // FETCH_ALL_PEOPLE_START,
    // FETCH_ALL_PEOPLE_SUCCESS,
    // FETCH_ALL_PEOPLE_FAILURE,
    SORT_PEOPLE,
    SEARCH_RECORD,
    ADD_RECORD,
    GOES_TO_NEXT_PAGE
} from '../actionType'

import {
    sortedPeoplesInt as sortedPeoplesIntSelector,
    sortedPeoplesStr as sortedPeoplesStrSelector,
    searchRecord, calcPages
} from '../selectors'
import {fetchPeople as fetchPeopleApi} from "../service";


export const fetchPeople = (url) => async dispatch => {
    dispatch({
        type: FETCH_PEOPLE_START
    });
    try {
        const people = await fetchPeopleApi(url);
        dispatch({
            type: FETCH_PEOPLE_SUCCESS,
            payload: people
        })

    } catch (e) {
        dispatch({
            type: FETCH_PEOPLE_FAILURE,
            paylaod: e,
            error: true
        })
    }

};

export const sortedPeoplesStr = (id, array, sorted) => dispatch => {
    const newSortArr = sortedPeoplesStrSelector(id, array, sorted);
    if (sorted) {
        dispatch({
            type: SORT_PEOPLE,
            payload: {
                newSortArr,
                sorted: false
            }
        });
    } else {
        dispatch({
            type: SORT_PEOPLE,
            payload: {
                newSortArr,
                sorted: true
            }
        });
    }

};

export const sortedPeoplesInt = (id, array, sorted) => dispatch => {
    const newSortArr = sortedPeoplesIntSelector(id, array, sorted);
    if (sorted) {
        dispatch({
            type: SORT_PEOPLE,
            payload: {newSortArr, sorted: false}
        });
    } else {
        dispatch({
            type: SORT_PEOPLE,
            payload: {newSortArr, sorted: true}
        });
    }

};

export const findRecord = (text, array) => dispatch => {
    const people = array;
    const record = searchRecord(text, array);
    dispatch({
        type: SEARCH_RECORD,
        payload: {record, people}
    })
};


export const addRecord = (array) => dispatch => {
    const people = array;
    dispatch({
        type: ADD_RECORD,
        payload: {people}
    })
};

export const loadNextPage = (curPage, array) => dispatch => {
    const people = array;
    const pageContent = calcPages(curPage, array);
    dispatch({
        type: GOES_TO_NEXT_PAGE,
        payload: {pageContent, people}
    })
};
