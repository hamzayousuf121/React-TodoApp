import {createStore, applyMiddleware} from 'redux';
import {todoReducer} from './Reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(todoReducer, composeWithDevTools(
    applyMiddleware()
));
