const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const User = require('../controller/user');
const Product = require('../controller/product');

//Users
router.post('/signup',User.signup);
router.post('/login', User.login);
router.get('/user/:id/products', auth, User.getUserWithProducts);
router.get('/user/:id', auth, User.getOne);

//Products
router.post('/product', auth, Product.create);
router.get('/products', auth, Product.getAllProducts);
router.get('/product/:id', auth, Product.getOne);
router.delete('/product/:id', auth, Product.delete);
router.put('/product/:id', auth, Product.update);



module.exports = router;