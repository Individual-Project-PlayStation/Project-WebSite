// IMPORT

var express = require("express");
var router = express.Router();

var usuarioController = require("../controller/usuarioController");


// CADASTRAR

router.post("/cadastrar", (req, res) => {
    usuarioController.cadastrar(req, res);
});


// LOGIN

router.post("/autenticar", (req, res) => {
    usuarioController.autenticar(req, res);
});


// INICIAR QUIZ

router.post("/iniciarQuiz", (req, res) => {
    usuarioController.iniciarQuiz(req,res);
});


// FINALIZAR QUIZ

router.post("/finishGame", function (req, res) {
    usuarioController.finishGame(req,res);
});


// RESULTADO DO QUIZ


router.post("/quizResultado", (req,res) => {
    usuarioController.quizResultado(req,res);
});

// MOSTRAR GRAFICO

router.post("/mostrarGrafico", (req,res) => {
    usuarioController.listar(req,res);
});

// ULTIMOS RESULTADOS

router.get("/ultimosResultados/:idUsuario", function (req, res) {
    usuarioController.buscarUltimosResultados(req, res);
});

// ULTIMOS RESULTADOS EM TEMPO REAL

router.get("/ultimosResultadosTempoReal/:idUsuario", function (req, res) {
    usuarioController.ultimosResultadosTempoReal(req, res);
});

// TODOS OS USUARIOS RANKEADOS

router.get("/ranking", (req, res) => {
    usuarioController.ranking(req, res)
})

// EXPORT

module.exports = router;