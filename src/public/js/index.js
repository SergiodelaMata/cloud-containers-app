const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const app = express();

var client = redis.createClient(REDIS_PORT);

startConnectionRedis();

async function startConnectionRedis()
{
    if(!client.isOpen)
    {
        client = redis.createClient(REDIS_PORT);
        await client.connect();
    }
}

async function getRepos(req, res, next) {
    try {
        console.log("Haciendo el fetch de la API de GitHub");
        const {username} = req.params;
        const response = await fetch(`https://api.github.com/users/${username}`);

        const data = await response.json();

        const repos = data.public_repos;
        saveMongo(username,repos);

        await client.set(username, repos); //Clave, tiempo para expiración (1 hora), datos a guardar
        await client.disconnect();
        res.send(formateaSalida(username, repos));
        console.log("Fin de la petición a la API de GitHub");
    } catch (err) {
        console.error(err);
        res.status(500);
    }
}

function formateaSalida(username, repos){
    return `<h4>El usuario ${username} tiene ${repos} repositorios en GitHub </h4>`
}


async function cacheo(req, res, next){
    startConnectionRedis()
    console.log("Testeando si el dato está en caché");
    const {username} = req.params;
    const data = await client.get(username);
    if(data !== null)
    {
        console.log("Caché hit!");
        client.disconnect();
        res.send(formateaSalida(username, data));
    }
    else{
        console.log("Caché miss");
        next();
    }
}

const MongoClient = require('mongodb').MongoClient;

async function saveMongo(usuario, repositorio){

    clientemongo = MongoClient.connect('mongodb://admin:password@localhost:27017',
    function(err, clientemongo){
        if(err) throw err;
        
        const db = clientemongo.db('repositorio');
        const query = {nombre:usuario};
        const datosnuevos = { $set: {'repos': repositorio}};
        db.collection('usuarios').findOneAndUpdate(query, datosnuevos, {upsert:true}, function(err, resultado){
            if(err) throw err;
            clientemongo.close();
            console.log(resultado);
        });
    });
}

function testMongo(req, res, next){
    console.log('testMongo');
    MongoClient.connect('mongodb://admin:password@localhost:27017',
    function (err, clientemongo){
        if(err) throw err;

        const db = clientemongo.db('repositorio');
        const {username} = req.params;
        const query = {nombre: username};
        db.collection('usuarios').findOne(query, function(err, resultado){
            if(err) throw err;
            clientemongo.close();
            res.send(resultado);
            console.log(resultado);
        });
    });
}

app.get("/datosbasededatos/:username", testMongo);
app.get("/datosrepositorio/:username", cacheo, getRepos);

app.listen(PORT, () => {
    console.log(`Lanzada la aplicación en el puerto ${PORT}`)
})