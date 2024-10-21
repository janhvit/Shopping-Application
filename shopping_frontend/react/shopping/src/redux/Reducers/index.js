import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    
    cart: cartReducer,
    order: orderReducer,
    product: productReducer,
});

export default rootReducer;
