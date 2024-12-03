const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product-controller');

router.get('/teams/:id', ProductController.getTeamDetails);

//Pagination API that takes input - team name and height and returns a certain number of products.
router.get('/products', ProductController.getProductsFromTeamId);

module.exports = router;



