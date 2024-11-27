
const Product = require('../models/product-model');

async function handleFetchProductData(req,res)
{
    try {

        const { id } = req.params;
        console.log(id);
    
        // Validate the format of the ID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid product ID format',
          });
        }
    
        // Fetch the product by ID
        const product = await Product.findById(id) // Assuming 'name' field exists in Team schema
        if (!product) {
            return res.status(404).json({
            success: false,
            message: 'Product not found',
          });
        }
    
        // Send a successful response
        res.status(200).json({
          success: true,
          message: 'Product retrieved successfully',
          data: product,
        });
      } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          error: error.message,
        });
      }
}

module.exports = {handleFetchProductData}