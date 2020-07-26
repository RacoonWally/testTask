import {
    FETCH_PEOPLE_SUCCESS,
    FETCH_ALL_PEOPLE_SUCCESS,
    SORT_PEOPLE
} from '../actionType'
import * as R from 'ramda'


const initialState = {
};

export default (state = initialState, {type, payload}) => {


    switch (type) {
        case FETCH_PEOPLE_SUCCESS:{
            // const newValues = R.indexBy(R.prop('id'), payload);
            return {
                // people: R.merge(state, newValues),
                people: payload
            }
        }
        case SORT_PEOPLE: {
            console.log("SORT PPL REDUCER");
            console.log(payload.sorted);
            return {
                people: payload.newSortArr,
                sorted: payload.sorted
            }
        }



        default: return state
    }
}
