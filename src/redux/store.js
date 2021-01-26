import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer  from './reducers';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension'
const initState = {};

const store = createStore(
    rootReducer,
     initState, 
     compose(
         applyMiddleware(thunk),
         devToolsEnhancer({ trace: true }),

     )
    );

export default store;