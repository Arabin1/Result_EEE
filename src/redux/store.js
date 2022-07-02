import {createStore, combineReducers} from 'redux';
import {resultManager} from './reducers';

const rootReducer = combineReducers({resultManager});

const store = createStore(rootReducer);

export default store;
