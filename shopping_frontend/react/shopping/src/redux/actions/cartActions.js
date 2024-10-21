import axios from 'axios';

export const ADD_TO_CART = 'ADD_TO_CART';
export const PLACE_ORDER = 'PLACE_ORDER';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};

export const addToCart = (productId, quantity) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    console.log('Adding product to cart with ID:', productId); 

    try {
        const productResponse = await axios.get(`http://localhost:8000/shop/products/${productId}/`, {
    headers: { Authorization: `Bearer ${token}` }
        });

        const product = productResponse.data;

        const cartItem = {
            id: product.id,
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock,
            },
            quantity,
        };

        const currentCartItems = getState().cart.items || [];
        const existingCartItem = currentCartItems.find(item => item.product.id === product.id);

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            const updatedCartItems = [...currentCartItems];
            saveCartToLocalStorage(updatedCartItems);
            dispatch({ type: ADD_TO_CART, payload: updatedCartItems });
        } else {
            const updatedCartItems = [...currentCartItems, cartItem];
            saveCartToLocalStorage(updatedCartItems);
            dispatch({ type: ADD_TO_CART, payload: updatedCartItems });
        }
    } catch (error) {
        console.error('Error adding to cart:', error); 
    }
};

export const removeFromCart = (cartItemId) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    try {
    
        await axios.patch(`http://localhost:8000/shop/cart/${cartItemId}/`, { quantity: 0 }, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const currentCartItems = getState().cart.items || [];
        const updatedCartItems = currentCartItems.filter(item => item.id !== cartItemId);
        saveCartToLocalStorage(updatedCartItems);
        
        dispatch({ type: REMOVE_FROM_CART, payload: cartItemId });
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
};

export const clearCart = () => (dispatch) => {
    localStorage.removeItem('cart'); 
    dispatch({ type: CLEAR_CART });
};



export const placeOrder = (orderData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/shop/orders/', orderData); 
        dispatch({ type: PLACE_ORDER, payload: response.data });
        return response.data; 
    } catch (error) {
        console.error('Error placing order:', error);
        throw error; 
    }
};


