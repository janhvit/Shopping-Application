import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../redux/actions/cartActions';
import { placeOrder } from '../redux/actions/orderActions'; 
import { Card, CardContent, CardActions, Button, Typography, Grid, Box, Snackbar, Alert } from '@mui/material';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items || []);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const totalPrice = cartItems.reduce((acc, item) => {
        if (item.product) {
            return acc + item.product.price * item.quantity;
        }
        return acc;
    }, 0);

    const handleAdd = (itemId) => {
        const currentItem = cartItems.find(item => item.id === itemId);
        if (currentItem && currentItem.product) {
            const stockAvailable = currentItem.product.stock;
            if (currentItem.quantity < stockAvailable) {
                dispatch(addToCart(itemId, 1));
                setSuccessMessage('Product added to cart!');
            } else {
                setSuccessMessage(`Only ${stockAvailable} units available in stock.`);
                setSnackbarOpen(true);
            }
        }
    };

    const handleRemove = (itemId) => {
        const currentItem = cartItems.find(item => item.id === itemId);
        if (currentItem && currentItem.quantity > 1) {
            dispatch(addToCart(itemId,  -1 )); 
        } else {
            handleRemoveFromCart(itemId); 
        }
    };

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));
    };
 
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    
    const calculateTotalPrice = (cartItems) => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
    };
    
    const handlePlaceOrder = async () => {
        
        const orderData = {
            items: cartItems.map(item => ({
                product: item.product.id, 
                quantity: item.quantity
            })),
            total_price: totalPrice.toFixed(2) 
        };
    
        try {
            const response = await dispatch(placeOrder(orderData));
            if (response) {
                setSuccessMessage('Order placed successfully!');
                setSnackbarOpen(true);
                handleClearCart(); 
            } else {
                setSuccessMessage('Failed to place order.');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setSuccessMessage('Failed to place order.');
            setSnackbarOpen(true);
        }
    };
    

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Your Cart</Typography>
            {cartItems.length === 0 ? (
                <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
                        <Grid container spacing={2}>
            {cartItems.map(item => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card>
                        <CardContent>
                            {item.product ? (
                                <>
                                    <Typography variant="h6" gutterBottom>{item.product.name}</Typography>
                                    <Typography variant="body1">
                                        ${item.product.price} x {item.quantity}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Available Stock: {item.product.stock} units
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="body1" color="error">
                                    Product information unavailable
                                </Typography>
                            )}
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleRemove(item.id)} disabled={item.quantity === 1}>-</Button>
                            <Typography variant="body1">{item.quantity}</Typography>
                            <Button size="small" onClick={() => handleAdd(item.id)}>+</Button>
                            <Button size="small" onClick={() => handleRemoveFromCart(item.id)} color="error">Remove</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
        )}
                    {cartItems.length > 0 && (
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5">Total Price: ${totalPrice.toFixed(2)}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePlaceOrder}
                        sx={{ marginTop: 2 }}
                    >
                        Place Order
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClearCart}
                        sx={{ marginTop: 2 }}
                    >
                        Clear Cart
                    </Button>
                </Box>
            )}

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Cart;
