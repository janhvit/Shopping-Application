import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/cart';
import Login from './components/login';
import Register from './components/Register';
import OrderHistory from './components/OrderHistory';


const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/orders">Order History</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
