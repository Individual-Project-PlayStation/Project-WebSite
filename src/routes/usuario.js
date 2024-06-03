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


// EXPORT

module.exports = router;