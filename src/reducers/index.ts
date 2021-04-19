import {combineReducers} from 'redux';
import todo from './todo';
import loading from './loading';
import toast from './toast';

const rootReducer = combineReducers({
    todo,
    loading,
    toast
});

export default rootReducer;