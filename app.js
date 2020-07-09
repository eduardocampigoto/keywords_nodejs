//REQUIRES
const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const http = require('http');
const request = require('request');
const fetch = require('node-fetch');
//const bootstrap = require('bootstrap');
//Express
const app = express();
//MODULES
//const routes = require("./Routes/index");



//Config
    //Template Engine
    app.engine('handlebars',handlebars({defaultLayout: 'main', allowProtoMethodsByDefault: true}))
    app.set('view engine','handlebars')
    //Body Parser
    app.use(bodyparser.urlencoded({extended:false}));
    app.use(bodyparser.json());

    //App home
    const URIADDR= "http://localhost:8080/api/";

    

    
var chaves = ["teste"];

app.get("/palavraschave",function(req, res){
var reqst =  URIADDR+"palavra-chave?chave="+chaves[0];
let settings = { method: "Get" };

    fetch(reqst, settings)
        .then(res => res.json())
        .then((chaves) => {
            res.render('home',{chaves:chaves});  
            console.log(chaves);
        });
})

app.get("/",function(req, res){
    var reqst =  URIADDR+"resposta?chave="+chaves[0];
    let settings = { method: "Get" };
    
        fetch(reqst, settings)
            .then(res => res.json())
            .then((chaves) => {
                res.render('buscarespostas',{chaves:chaves});  
                console.log(chaves);
            });
    })

    app.get("/cadrespostas",function(req, res){
   
            res.render('cadastrarrespostas',function(){
                
            });  
            
        })

    app.listen(8081, function(){
        console.log("Aplicativo iniciado corretamente");
    })
    module.exports = app;