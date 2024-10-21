

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import orderReducer from './Reducers/orderReducer';
import cartReducer from './Reducers/cartReducer';


const rootReducer = combineReducers({
    cart: cartReducer,
    order: orderReducer,
    
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
