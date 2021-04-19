import {combineReducers} from 'redux';
import todo from './todo';
import loading from './loading';

const rootReducer = combineReducers({
    todo,
    loading
});

export default rootReducer;