import axios from 'axios';

export const PLACE_ORDER = 'PLACE_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';


export const placeOrder = (orderData) => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        if (!orderData || !orderData.items || orderData.items.length === 0) {
            throw new Error("Order data is undefined or items are missing");
        }

        const response = await axios.post('http://localhost:8000/shop/orders/', orderData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        dispatch({ type: PLACE_ORDER, payload: response.data });
        return response.data; 
    } catch (error) {
        console.error('Error placing order:', error.response ? error.response.data : error.message);
    }
    
};



export const fetchOrders = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:8000/shop/history/', {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: FETCH_ORDERS, payload: response.data });
    } catch (error) {
        if (error.response) {
            console.error('Error fetching orders:', error.response.data); 
        } else {
            console.error('Error fetching orders:', error.message);
        }
    }
};
