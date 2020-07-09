//REQUIRES
const express = require('express');
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser');
const http = require('http');
const request = require('request');
const fetch = require('node-fetch');
const { debug } = require('console');
//const bootstrap = require('bootstrap');
//Express
const app = express();
//MODULES
//Config
//Template Engine
app.engine('handlebars', handlebars({ defaultLayout: 'main', allowProtoMethodsByDefault: true }))
app.set('view engine', 'handlebars')
//Body Parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//App home
const BASE_API = "http://localhost:8080/api";


/*let chaves = [];
function getchaves() {
    var chaves = document.getElementById("formbuscachave");
    var reqst = BASE_API + "resposta?chave=" + chaves;
    let settings = { method: "Get" };
    console.log(chaves);

    fetch(reqst, settings)
        .then(res => res.json())
        .then((chaves) => {
            res.render('buscarespostas', { chaves: chaves });
            console.log(chaves);
        });
}*/




app.get("/", function (req, res) {
    let chaves = req.body.chaves;
    let reqst = `${BASE_API}/resposta?chave=${chaves}`;
    let settings = {method: "GET"};
    if (req == "null") {

    } else {
        
        
        fetch(reqst, settings)
            .then(res => res.json())
            .then((chaves) => {
                res.render('home', { chaves: chaves });
                console.log(chaves);
            });
    }
})

app.get("/palavraschave", function (req, res) {
    const titulo = `Palavras chave`;
    let chaves = req.body.chaves;
    let reqst = `${BASE_API}/palavra-chave?chave=${chaves}`;
    let settings = { method: "Get" };
    fetch(reqst, settings)
        .then(res => res.json())
        .then((chaves) => {
            res.render('home', { chaves: chaves, titulo} );
            console.log(chaves);
        });
})

app.get("/cadrespostas", function (req, res) {
    const titulo = `Integrar respostas e palavras chave`;
    let chaves = req.body.chaves;
    res.render('cadastrarrespostas', { chaves: chaves, titulo });
})

app.post("/cadastrar", function (req, res) {
    const titulo = `Integrar respostas e palavras chave`;
    let chave = req.body.chave;
    let resposta = req.body.resposta;
    let reqst = `${BASE_API}/resposta?chave=${chave}&resposta=${resposta}`
    let settings = {method:'POST'};
    fetch(reqst,settings)
        .then(res => res.json())
        .then(res.render("buscarespostas", { chave: chave, titulo }))
    console.log(`
    Chave: ${chave}
    Resposta atribuida: ${resposta}
    `);
})

app.get("/buscarespostas", function (req, res) {
    
    const titulo = `Buscar respostas`;
    
    let chave = req.body.chave;

    res.render('buscarespostas', { chave: chave, titulo });
})

app.get("/buscarresposta", function (req, res) {
    let chave = req.body.chave;
    console.log("chave");
        let reqst = `${BASE_API}/resposta?chave=${chave}`;
        let settings = { method: "Get" };
        fetch(reqst, settings)
            .then(res => res.json())
            .then((chaves) => {
                console.log(chaves);
                res.render('buscarespostas', { chaves: chaves });

            }); 

})



app.listen(8081, function () {
    console.log(`------------------------------------
| Aplicativo iniciado corretamente |
------------------------------------`);
})
module.exports = app;