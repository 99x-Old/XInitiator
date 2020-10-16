import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const initiatState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initiatState, compose(
    applyMiddleware(...middleware)
));

export default store;