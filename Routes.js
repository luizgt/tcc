const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser());

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const MongoClient = require('mongodb').MongoClient;

//url para acesso ao banco
const uri = "mongodb+srv://luizzgt:jnU4132717luiz@cluster0-buhms.mongodb.net/test?retryWrites=true&w=majority"


MongoClient.connect(uri, (err, client) => { //conectando ao banco
    if (err) return console.log(err)        //se a conecao for aceita, o servidor starta
    db = client.db('Cluster0')              // acessei minha tabela

    app.listen(3000, () => {                //servidor startado na porta 3000
        console.log('Server running on port 3000!')         //msg confirmacao
    })
})

app.get('/', function (req, res) {          //restosta ao get
    db.collection('mapa').find().toArray((err, results) => {
        if (err) return console.log(err)
        
        res.send(results);
    })
});

app.post('/', (req, res) => {               //resposta ao post
    db.collection('mapa').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Objeto salvo no banco de dados!')      //msg confirmacao
    })
})