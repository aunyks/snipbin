#!/usr/bin/env nodejs
"use strict"
let fs       = require('fs');
let path     = require('path');
let express  = require('express');
let app      = express();

app.use(express.static(path.join(__dirname, 'client', 'public')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.get('/search', function(req, res){
    res.sendFile(path.join(__dirname, 'client', 'search.html'));
});

app.get('/edit', function(req, res){
    res.sendFile(path.join(__dirname, 'client', 'edit.html'));
});

app.get('/:address', function(req, res){
    let address = req.params.address;
    if(address.trim().substring(0, 2) === '0x' && address.length === 42){
        let addressHtml = fs.readFileSync(path.join(__dirname, 'client', 'address.html')).toString();
        let injectedFile = addressHtml.split('{{ ETH_ADDR }}').join(address);
        res.send(injectedFile);
    } else {
        res.sendFile(path.join(__dirname, 'client', 'index.html'));
    }
});

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(8080, function(){
    console.log('Ready to upload snippets!');
});