var express = require('express');
var router = express.Router();
const Category = require('../models/category');

/* GET users listing. */
// api/categories
router.get('/', async(req, res, next) => {

  console.log('api/categories')

try {
  const data = await Category.find().skip(0).limit(10);
  console.log('data', data);
  res.status(200).json(data);
  
} catch (error) {
  res.status(500).json({message:"Hata oluştu"});
}

});

module.exports = router;
