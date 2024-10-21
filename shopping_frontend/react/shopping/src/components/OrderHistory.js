import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/actions/orderActions';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.orders || []);

    useEffect(() => {
        dispatch(fetchOrders()); 
    }, [dispatch]);

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Order History</Typography>
            <Grid container spacing={3}>
                {orders.map(order => (
                    <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Order ID: {order.id}</Typography>
                                <Typography variant="body1">Total: ${order.total_price}</Typography>
                                <Typography variant="body2" color="textSecondary">Items:</Typography>
                                {order.items.length > 0 ? ( 
                                    order.items.map(item => (
                                        <Grid container key={item.product.id} alignItems="center" spacing={1}>
                                            <Grid item>
                                                <img 
                                                    src={item.product.image_url} 
                                                    alt={item.product.name} 
                                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2">
                                                    Product: {item.product.name} 
                                                    <br></br> Quantity: {item.quantity}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ))
                                ) : (
                                    <Typography variant="body2">No items in this order.</Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default OrderHistory;
