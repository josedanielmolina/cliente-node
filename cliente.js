const signalR = require("@microsoft/signalr");
const serialize = require('serialize-javascript');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const urlWS = 'https://socket-iac.azurewebsites.net/pruebas';
// const urlWS = 'https://localhost:44354/pruebas';

let connection = new signalR.HubConnectionBuilder()
    .withUrl(urlWS)
    .build();

connection.on("Iniciar", data => {
    console.log(data);
    enviarServer();

});

connection.on("Pausar", data => {
    console.log(data);
    clearInterval(contenedorF);
    contadorCO2 = 0;

});


connection.start()
    .then(() => console.log('Conectado'))
    .catch(error => console.log(error));

function numeroAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


let contenedorF;


const enviarServer = () => {

    contenedorF = setInterval(function () {
        let fecha = (new Date()).toString();
        let objeto = {
            valor1: numeroAleatorio(1500, 1600),
            valor2: numeroAleatorio(1500, 1600),
            valor3: numeroAleatorio(1500, 1600),
            valor4: numeroAleatorio(1500, 1600),
            valor5: numeroAleatorio(1500, 1600),
            valor6: numeroAleatorio(1500, 1600),
            fechaEnvio: fecha
        }

        let serializado = serialize(objeto);

        connection.invoke("RecibirMediciones", serializado);
    }, 100);

}
