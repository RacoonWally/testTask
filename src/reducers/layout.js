// import * as R from 'ramda'
//
// import {
//     FETCH_PEOPLE_SUCCESS,
//
// } from '../actionType'
//
// const initialState = {
//     someIds: [],
//     // allIds: []
// };
//
// export default (state = initialState, {type, payload}) => {
//      switch (type) {
//          case FETCH_PEOPLE_SUCCESS: {
//              return R.merge(state, {
//                  someIds: R.pluck('id',payload)
//              });
//          }
//          // case FETCH_ALL_PEOPLE_SUCCESS: {
//          //     return R.merge(state, {
//          //         allIds: R.pluck('id',payload)
//          //     });
//          // }
//
//          default: return state
//      }
// }
