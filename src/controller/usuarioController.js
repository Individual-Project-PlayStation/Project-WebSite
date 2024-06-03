const { response } = require("express");
var usuarioModel = require("../model/usuarioModel");


// AUTENTICAR

function autenticar(req, res) {

    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined || senha == undefined) {

        return res.status(400).send("Seu email ou senha está undefined!");

    }

    else {

        usuarioModel.autenticar(email, senha)
            .then((response) => {

                if (response[0] == undefined) {

                    return res.status(403).send("Email e/ou senha inválido(s)");

                }

                else {

                    return res.status(200).json({ "msg": "Usuário autenticado", response })

                }

            })

            .catch((erro) => { return res.status(400).json(erro.sqlMessage) })

    }

}


// CADASTRAR

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined || email == undefined || senha == undefined) {

        res.status(400).send("Erro ao cadastrar, Campos indefinidos!");

    }

    else {

        usuarioModel.cadastrar(nome, email, senha)
            .then((response) => {

                return res.json(`Usuário criado, ${response}`);

            }
            )
            .catch((erro) => {

                res.status(500).json({ "Erro": erro.sqlMessage });

            });
    }
}


// FINALIZAR QUIZ

function finishGame(req, res) {
    var idUsuario = req.body.idUsuario;
    var totalCorrect = req.body.totalCorrect;
    var totalIncorrect = req.body.totalIncorrect;

    if (totalCorrect == undefined) {
        return res.status(400).send("Erro: 'totalCorrect' não definido!");
    }
    if (totalIncorrect == undefined) {
        return res.status(400).send("Erro: 'totalIncorrect' não definido!");
    }

    // Inserir quiz e obter idQuiz
    usuarioModel.createQuiz().then(result => {
        var idQuiz = result.insertId; // Pega o ID do novo quiz inserido

        // Inserir métricas
        return usuarioModel.finishGame(idUsuario, idQuiz, totalCorrect, totalIncorrect);
    }).then(resultado => {
        res.json(resultado);
    }).catch(erro => {
        console.log(erro);
        console.log("Houve um erro ao finalizar o quiz! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


// RESULTADO DO QUIZ


function quizResultado(req, res) {

    var id = req.body.idServer;
    console.log("idResultado" + id);
    usuarioModel.quizResultado(id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao finalizar o quiz! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


// EXPORT

module.exports = {
    autenticar,
    cadastrar,
    // iniciarQuiz,
    finishGame,
    quizResultado
}