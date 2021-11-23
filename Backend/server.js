const http = require('http');
const { listen } = require('./app');
const app = require('./app');

const normalizePort = val => {
    const port = parseInt(val, 10);
    // La fonction parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.
    if (isNaN(port)) {
        // isNaN lien:https://www.w3schools.com/jsref/jsref_isnan.asp
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false
};
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port:' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
// Pour dire à l'application express sur quel port elle doit tournée
const server = http.createServer(app)// l'application express est une fonction qui contient la requête et la réponse

// server.listen(process.env.PORT || 3000);
// server.listen server qui écoute
// par defaut on met le port 3000 
// il y a des cas ou le port 3000 n'est pas disponible dans ce cas on utilise une variable environnement process.env.Port

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    console.log('listening on' + bind);
});

server.listen(port);