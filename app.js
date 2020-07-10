//REQUIRES
const express = require('express');
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser');
const http = require('http');
const request = require('request');
const fetch = require('node-fetch');
const { debug } = require('console');
const { contains } = require('jquery');
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
        .then((consultaRet) => {
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
            .then((consultaRet) => {
                res.render('home', { chaves: chaves });
                //console.log(chaves);
            });
    }
})

app.get("/buscapalavraschave", function (req, res) {
    const titulo = `Palavras chave`;
    let chaves = req.body.chave;
    //console.log(chaves);
    let reqst = `${BASE_API}/resposta?chave=${chaves}`;
    let settings = { method: "GET" };
    fetch(reqst, settings)
        .then(res => res.json())
        .then((consultaRet) => {
            let chaves = consultaRet;
                res.render('home', { chaves: chaves, titulo} );
                
            
        //        res.render('home', { "Nenhum resultado encontrado": chaves, titulo} );
        
            //console.log(chaves);
        });

})

app.get("/cadastrarrespostas", function (req, res) {
    const titulo = `Integrar respostas e palavras chave`;
    let chaves = req.body.chaves;
    res.render('cadastroRespostas', { consultaRet: chaves, titulo });
})

app.post("/executacadastrorespostas", function (req, res) {
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
    res.render('buscarespostas', { titulo });
})

app.get("/buscarrespostas", function (req, res) {
    
    // quando usa GET, pega parametro via req.query.nomeparametro
    // quando usa POST, pega parametro via req.body.nomeparametro (se vier do form) 
    // e req.query.nomeparametro se viar via querystring (acho que eh isso)
    var chave = req.query.chave;
    console.log(`busca resposta: ${chave}`);
        let reqst = `${BASE_API}/resposta/${chave}`;
        console.log(reqst);
        let settings = { method: "GET" };
        fetch(reqst, settings)
            .then(res => res.json())
            .then((consultaRet) => {
                let chaves = consultaRet;
                res.render('buscarespostas', { chaves : chaves });
            }); 
})

app.get("/cadastrarkeyword", function (req, res) {
    const titulo = `Cadastrar palavras chave`;
    let chaves = req.body.chaves;
    res.render('cadastroPalavrasChave', { consultaRet: chaves, titulo });
})

app.post("/executarcadkeyword", function (req, res) {
    const titulo = `Cadastrar palavras`;
    let chave = req.body.chave;
    let resposta = req.body.resposta;
    let reqst = `${BASE_API}/palavra-chave?chave=${chave}`
    let settings = {method:'POST'};
    fetch(reqst,settings)
        .then(res => res.json())
        .then(res.render("buscarespostas", { chave: chave, titulo }))
    //console.log(` Chave: ${chave}`);
})

app.listen(8081, function () {
    console.log(`------------------------------------
| Aplicativo iniciado corretamente |
------------------------------------`);
})
module.exports = app;