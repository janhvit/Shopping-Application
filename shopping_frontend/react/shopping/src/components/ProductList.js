import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './card.css'; 
import { Card, CardContent, CardActions, Button, Typography, Grid, Snackbar, Alert, CardMedia, TextField } from '@mui/material';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [addedToCart, setAddedToCart] = useState({});
    const [searchQuery, setSearchQuery] = useState(''); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const cartItems = useSelector(state => state.cart.items);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/shop/products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const updatedAddedToCart = {};
        cartItems.forEach(item => {
            updatedAddedToCart[item.id] = true; 
        });
        setAddedToCart(updatedAddedToCart);
    }, [cartItems]);

    const handleButtonClick = (product) => {
        const { id, stock } = product;

        if (addedToCart[id]) {
            navigate('/cart'); 
        } else {
            if (stock > 0) {
                dispatch(addToCart(id, 1));
                setSuccessMessage('Product added to cart!');
                
                setAddedToCart(prevState => {
                    const newState = { ...prevState, [id]: true }; 
                    localStorage.setItem('addedToCart', JSON.stringify(newState));
                    return newState;
                });
            } else {
                setWarningMessage(`This product is out of stock.`);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
        setWarningMessage('');
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Products</Typography>
            
            <TextField
                label="Search Products"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
            />

            <Grid container spacing={3}>
                {filteredProducts.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardMedia
                                component="img"
                                sx={{ 
                                    height: '200px', 
                                    width: '100%',    
                                    objectFit: 'contain', 
                                }}
                                image={product.image_url}
                                alt={product.name}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                                <Typography variant="h6" sx={{ marginTop: 1 }}>Price: ${product.price}</Typography>
                                <Typography variant="body2" color="textSecondary">Stock: {product.stock} units available</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color={addedToCart[product.id] ? 'secondary' : 'primary'}
                                    onClick={() => handleButtonClick(product)} 
                                    fullWidth
                                    disabled={product.stock <= 0} 
                                >
                                    {addedToCart[product.id] ? 'Go to Cart' : (product.stock > 0 ? 'Add to Cart' : 'Out of Stock')}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Snackbar
                open={!!successMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!warningMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
                    {warningMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProductList;
