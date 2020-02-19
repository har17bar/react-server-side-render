import express from 'express'
import fs from 'fs'
import path from 'path'
import React from "react";
import ReactDOMServer from 'react-dom/server'
import App from '../src/App'

const PORT = 8000;
const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('^/$', (req, res, next) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data)=>{
        if (err){
            return res.status(500).send("Some error happened")
        }
        return res.send(data.replace(
            '<div id ="root"</div>',
            `<div id ="root">${ReactDOMServer.renderToString(<App  />)}</div>`))
    })
});

app.get('/data', (req, res) => res.json({data:"data"}));

app.use(express.static(path.resolve(__dirname, '..','build')));

app.listen(PORT, ()=>{
    console.log(`App launched on ${PORT}`)
});