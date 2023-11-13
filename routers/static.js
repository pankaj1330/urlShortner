const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    return res.render('index');
})
router.get('/clicks',(req,res)=>{
    return res.render('clicks');
})

module.exports = router;