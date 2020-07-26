import {
    FETCH_PEOPLE_SUCCESS,
    FETCH_ALL_PEOPLE_SUCCESS,
    SORT_PEOPLE,
    SEARCH_RECORD
} from '../actionType'
import * as R from 'ramda'


const initialState = {
};

export default (state = initialState, {type, payload}) => {


    switch (type) {
        case FETCH_PEOPLE_SUCCESS:{
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
                people: payload
            }
        }



        default: return state
    }
}
