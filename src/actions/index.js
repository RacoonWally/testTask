import {
    FETCH_PEOPLE_START,
    FETCH_PEOPLE_FAILURE,
    FETCH_PEOPLE_SUCCESS,
    FETCH_ALL_PEOPLE_START,
    FETCH_ALL_PEOPLE_SUCCESS,
    FETCH_ALL_PEOPLE_FAILURE,
    SORT_PEOPLE
} from '../actionType'
import {
    MIN_API_URL,
    NORMAL_API_URL
} from '../service/apiList'
import {
    sortedPeoplesInt as sortedPeoplesIntSelector,
    sortedPeoplesStr as sortedPeoplesStrSelector
} from '../selectors'
import {fetchPeople as fetchPeopleApi} from "../service";



export const fetchPeople = () => async dispatch => {
    dispatch({
        type: FETCH_PEOPLE_START
    });
    try{
        const people = await fetchPeopleApi(MIN_API_URL);
        dispatch({
            type: FETCH_PEOPLE_SUCCESS,
            payload: people
        })

    } catch (e) {
        dispatch({
            type:FETCH_PEOPLE_FAILURE,
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
    } else{
        dispatch({
            type: SORT_PEOPLE,
            payload: {newSortArr, sorted: true}
        });
    }

};




// export const fetchAllPeople = () => async dispatch => {
//     dispatch({
//         type: FETCH_ALL_PEOPLE_START
//     });
//     try{
//         const people = await fetchPeopleApi(NORMAL_API_URL);
//         dispatch({
//             type: FETCH_ALL_PEOPLE_SUCCESS,
//             payload: people
//         })
//
//     } catch (e) {
//         dispatch({
//             type:FETCH_ALL_PEOPLE_FAILURE,
//             paylaod: e,
//             error: true
//         })
//     }
//
// };
