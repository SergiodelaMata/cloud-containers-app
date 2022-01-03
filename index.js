const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);
const app = express();

async function getRepos(req, res, next) {
    try {
        console.log("Haciendo el fecch de la API de GitHub");
        const {username} = req.params;
        const response = await fetch(`https://api.github.com/users/${username}`);

        const data = await response.json();

        const repos = data.public_repos;
        client.setEx(username,repos); //Clave, tiempo para expiración (1 hora), datos a guardar

        res.send(setResponse(username, repos));

        console.log("Fin de la petición a la API de GitHub");
    } catch (err) {
        console.error(err);
        res.status(500);
    }
}

function setResponse(username, repos){
    return `<h2>El usuario ${username} tiene ${repos} repositorios en GitHub </h2>`
}

function cacheo(req, res, next){
    console.log("Testeando si el dato está en caché");
    const {username} = req.params;
    client.get(username, (err, data) => {
        if(err) throw err;
        if(data !== null){
            console.log("Caché hit!");
            res.send(setResponse(username, data));
        }
        else{
            console.log("Caché miss");
            next();
        }
    });
}

app.get("/datosrepositorio/:username", cacheo, getRepos);

app.listen(PORT, () => {
    console.log(`Lanzada la aplicación en el puerto ${PORT}`)
})