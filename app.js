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
app.use('/controllers', express.static(__dirname + '/Controllers'));
app.use('/frameworks', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//App home
const BASE_API = "http://localhost:8080/api";


app.get("/", function (req, res) {
    let chaves = req.query.chaves;
    let reqst = `${BASE_API}/palavra-chave?chave=${chaves}`;
    let scripts = "/frameworks/jquery.js"
    let settings = { method: "GET" };
    if (req != undefined) {
        fetch(reqst, settings)
            .then(res => res.json())
            .then((consultaRet) => {
                res.render('home', { buscarpalavraschave: "Nenhum resultado encontrado", scripts });
            });
    } else {
        fetch(reqst, settings)
            .then(res => res.json())
            .then((consultaRet) => {
                res.render('home', { buscarpalavraschave: "Nenhum resultado encontrado", scripts });

            });

    }
})

app.get("/buscapalavraschave", function (req, res) {
    const titulo = `Palavras chave`;
    let consulta = req.query.chave;
    console.log(consulta);
    let reqst = `${BASE_API}/palavra-chave/${consulta}`;
    let settings = { method: "GET" };
    fetch(reqst, settings)
        .then(res => res.json())
        .then((consultaRet) => {
            console.log(consultaRet);
            if (consultaRet && consultaRet != []) {
                res.render('buscarpalavraschave', { chaves: consultaRet, titulo });
            } else if (!consultaRet || consultaRet.trim()) {
                res.render('buscarpalavraschave', { resultado: "Nenhum resultado encontrado", titulo });

            }
            //console.log(chaves);
        });

})

app.get("/cadastrarrespostas", function (req, res) {
    const titulo = `Integrar respostas e palavras chave`;
    let chaves = req.body.chaves;
    let scripts = ["/controllers/cadastraRespostas.js", "/frameworks/jquery.js"]
    res.render('cadastroRespostas', { consultaRet: chaves, titulo, scripts });
})

app.post("/executacadastrorespostas", function (req, res) {
    const titulo = `Integrar respostas e palavras chave`;
    let scripts = ["/controllers/cadastraRespostas.js", "/frameworks/jquery.js"]
    let chave = req.body.chave;
    let resposta = req.body.resposta;
    let reqst = `${BASE_API}/resposta?chave=${chave}&resposta=${resposta}`
    let settings = { method: 'POST' };
    fetch(reqst, settings)
        .then(res => res.json())
        .then(res.render("cadastroRespostas", { chave: chave, titulo, scripts }))
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
    if (chave != undefined) {
        let reqst = `${BASE_API}/resposta/${chave}`;
        console.log(reqst);
        let settings = { method: "GET" };
        fetch(reqst, settings)
            .then(res => res.json())
            .then((consultaRet) => {
                if (chave.trim()) {
                    res.render('buscarespostas', { chaves: consultaRet });
                } else {
                    res.render('buscarespostas', { resultado: "Nenhum resultado encontrado" });
                }
            });
    } else {
        res.render('buscarespostas', { resultado: "Preencha o campo e clique em buscar" });
    }
})

app.get("/cadastrarkeyword", function (req, res) {
    const titulo = `Cadastrar palavras chave`;
    res.render('cadastroPalavrasChave', { titulo });
    debugger;
})

app.post("/executarcadkeyword", function (req, res) {
    const titulo = `Cadastrar palavras chave`;
    let chavelst = req.body.chave;
    if (chavelst != undefined || caveslst[0] != '') {
        var chavespt = chavelst.split(" ");
        console.log(chavespt);
        res.render('cadastroPalavrasChave', { titulo });

        try {
            chavespt.forEach(elemento => {
                console.log(elemento);
                let reqst = `${BASE_API}/palavra-chave?chave=${elemento}`
                let settings = { method: 'POST' };

                fetch(reqst, settings)
                    .then(res => res.json())
                    .then(res.render("cadastroPalavrasChave", { titulo }))
            });

        } catch (error) {
            console.log(error);
        }
    }else{
        fetch(reqst, settings)
                    .then(res => res.json())
                    .then(res.render("cadastrarkeyword", { titulo, resultado: "O campo de cadastro não pode estar vazio, preencha-o e tente novamente" }))
    }
})

app.listen(8081, function () {
    console.log(`------------------------------------
| Aplicativo iniciado corretamente |
------------------------------------`);
})
module.exports = app;