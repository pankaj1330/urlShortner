const express = require('express');
const short = require('short-uuid');
const URL = require('../models/url');

const router = express.Router();

router.post('/generateShortURL',async (req,res)=>{
    const actualURL = req.body.url;
    if(!actualURL){
        return res.send('enter the url');
    }
    const shortURL = short.generate();
    await URL.create({
        actualURL,
        shortURL
    })
    return res.json({"shorturl" : shortURL});
})

router.post('/getData',async (req,res)=>{
    const shorturl = req.body.shorturl;
    if(!shorturl){
        return res.send("enter the short url");
    }
    const url = await URL.findOne({"shortURL" : shorturl});
    if(!url){
        return res.status(404).send("short url does not exist");
    }
    return res.json(url);
})

router.get('/:id',async (req,res)=>{
    const id = req.params.id;
    const url = await URL.findOne({shortURL : id});
    if(!url){
        return res.status(404).send("404 URL not found");
    }
    const actualURL = url.actualURL;
    let newclicks = url.clicks+1;
    await URL.findOneAndUpdate(url,{$set : {clicks : newclicks}});
    return res.redirect(actualURL);
})

module.exports = router;