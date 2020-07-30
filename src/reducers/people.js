import {
    FETCH_PEOPLE_SUCCESS,
    FETCH_ALL_PEOPLE_SUCCESS,
    SORT_PEOPLE,
    SEARCH_RECORD,
    ADD_RECORD,
    GOES_TO_NEXT_PAGE
} from '../actionType'
import * as R from 'ramda'


const initialState = {};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_PEOPLE_SUCCESS: {
            return {
                people: payload
            }
        }
        case SORT_PEOPLE: {
            return {
                people: payload.newSortArr,
                sorted: payload.sorted
            }
        }
        case SEARCH_RECORD: {

            return {
                ...state,
                findedPeople: payload.record
            }
        }
        case ADD_RECORD: {

            return {
                people: payload.people
            }
        }
        case GOES_TO_NEXT_PAGE: {

            console.log("reducer");
            console.log(payload);
            console.log(payload.people);

            return {
                ...state,
                pageContent: payload.pageContent
            }

        }

        default:
            return state
    }
}
