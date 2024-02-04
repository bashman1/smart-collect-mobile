import { createStore, combineReducers } from 'redux';
import userDataReducer from './reducers/Reducer';

const rootReducer = combineReducers({
    userDataReducer: userDataReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;