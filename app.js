//REQUIRES
const express = require('express');
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser');
const http = require('http');
const request = require('request');
const fetch = require('node-fetch');
//const bootstrap = require('bootstrap');
//Express
const app = express();
//MODULES
//Config
    //Template Engine
    app.engine('handlebars',handlebars({defaultLayout: 'main', allowProtoMethodsByDefault: true}))
    app.set('view engine','handlebars')
    //Body Parser
    app.use(bodyparser.urlencoded({extended:false}));
    app.use(bodyparser.json());

    //App home
    const BASE_API= "http://localhost:8080/api/";


var chaves= [];
function getchaves(){
    var chaves = document.getElementById("formbuscachave");
    var reqst =  BASE_API+"resposta?chave="+chaves;
    let settings = { method: "Get" };
    console.log(chaves);
       
        fetch(reqst, settings)
            .then(res => res.json())
            .then((chaves) => {
                res.render('buscarespostas',{chaves:chaves});  
                console.log(chaves);
            });
}

    


app.get("/palavraschave",function(req, res){
var reqst =  BASE_API+"palavra-chave?chave="+chaves[0];
let settings = { method: "Get" };

    fetch(reqst, settings)
        .then(res => res.json())
        .then((chaves) => {
            res.render('home',{chaves:chaves});  
            console.log(chaves);
        });
})

app.get("/",function(req, res){
    if(req != null){
       
    }else{
        var reqst =  BASE_API+"resposta?chave="+chaves[0];
        let settings = { method: "Get" };
        
            fetch(reqst, settings)
                .then(res => res.json())
                .then((chaves) => {
                    res.render('buscarespostas',{chaves:chaves});  
                    console.log(chaves);
                });
            }
    })

    app.get("/cadrespostas",function(req, res){
     
           res.render('cadastrarrespostas',{chaves:chaves});  
     
            
        })

    app.post("cadastrar",function(req,res){
        console.log("entrou, ui!");
        const chave = req.body.chave; 
        fetch(`${BASE_API}/palavra-chave${chave}`)
        .then(res = res.json())
        .then(res.render("buscarespostas", { chave: chave }))
        console.log(chaves);
        
    })

    app.listen(8081, function(){
        console.log("Aplicativo iniciado corretamente");
    })
    module.exports = app;