import { PLACE_ORDER, FETCH_ORDERS } from '../actions/orderActions';

const initialState = {
    orders: [], 
    orderDetails: null, 
    loading: false, 
    error: null 
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLACE_ORDER:
            return {
                ...state,
                orderDetails: action.payload, 
                orders: [...state.orders, action.payload], 
                loading: false, 
                error: null 
            };
        case FETCH_ORDERS:
            return {
                ...state,
                orders: action.payload, 
                loading: false, 
                error: null 
            };
        case 'FETCH_ORDERS_REQUEST': 
            return {
                ...state,
                loading: true, 
                error: null
            };
        case 'FETCH_ORDERS_FAILURE': 
            return {
                ...state,
                loading: false,
                error: action.payload 
            };
        default:
            return state;
    }
};

export default orderReducer;
