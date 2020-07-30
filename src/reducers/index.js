import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'

import people from "./people";
import layout from "./layout";

export default history => combineReducers({
    people,
    // layout,
    router: connectRouter(history)
});
