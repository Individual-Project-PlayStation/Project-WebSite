// ----------------------------------------------------------------------------------------

// var ambiente_processo = 'producao'

var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

// ----------------------------------------------------------------------------------------


// IMPORT

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuario");

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;


// CONFIG

var app = express();


app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


// ROUTES

app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);


app.listen(PORTA_APP, () => console.log(`Servidor rodando na porta: http://${HOST_APP}:${PORTA_APP} \n\n 
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. `));