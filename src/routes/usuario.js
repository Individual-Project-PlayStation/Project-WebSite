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


// EXPORT

module.exports = router;