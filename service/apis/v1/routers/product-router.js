const express = require('express');
 
const Router = express.Router();
const productController = require('../controllers/product-controller');


//Fetch Product Data using ID of product (For Product Page)
Router.get('/product/:id', productController.handleFetchProductData);



module.exports = Router;
