const express = require("express");
const resultsController = require('../controllers/resultsController.js')
const router = express.Router();


router.get('/', resultsController.getResults, (req,res)=>{
    res.status(200).json(res.locals.results);
})



module.exports = router;