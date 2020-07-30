import {
    FETCH_PEOPLE_START,
    FETCH_PEOPLE_SUCCESS,
    SORT_PEOPLE,
    SEARCH_RECORD,
    ADD_RECORD,
    GOES_TO_NEXT_PAGE
} from '../actionType'
import * as R from 'ramda'


const initialState = {};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_PEOPLE_START: {
            return {
                loading: payload
            }

        }
        case FETCH_PEOPLE_SUCCESS: {
            return {
                people: payload.people,
                loading: false
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
        // case GOES_TO_NEXT_PAGE: {
        //     return {
        //
        //         pageContent: payload.pageContent
        //     }
        //
        // }

        default:
            return state
    }
}
