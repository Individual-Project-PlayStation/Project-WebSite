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

// function experienciaNovato() {
//     fetch('http://localhost:3333/perguntas/contarNovato')


//         .then(response => response.json())
//         .then(data => {

//             console.log(data[0].quantidade)
//             const ctx = document.getElementById('myChart1');

//             new Chart(ctx, {
//                 type: 'bar',
//                 data: {
//                     labels: ['Novatos'],
//                     datasets: [{
//                         label: 'Usuários',
//                         data: [data[0].quantidade, 20],
//                         borderWidth: 1,
//                         backgroundColor: 'rgba(148,0,211)',
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         y: {
//                             beginAtZero: true
//                         }
//                     },
//                     plugins: {
//                         legend: {
//                             display: false // Defina como false para ocultar a legenda
//                         }
//                     },
//                 },

//             });

//         })
// }

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


function buscarUltimosResultados(req, res) {

    const limite_linhas = 7;

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    usuarioModel.buscarUltimosResultados(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {

        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    });
}


function ultimosResultadosTempoReal (req, res) {

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando resultados em tempo real`);

    usuarioModel.ultimosResultadosTempoReal(idUsuario).then(function (resultado) {

        if (resultado.length > 0) {
            res.status(200).json(resultado[0].acertos);
        } 
        
        else {
            res.status(204).send("Nenhum resultado encontrado!")
        }

    }).catch(function (erro) {

        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);

    });
}

function ranking(req, res) {
    
    usuarioModel.ranking().then((dados) => {
        return res.status(200).json(dados);
    })

}


function searchAllMusic(req, res) {

    musicModel.searchAllMusic().then((musics) => {
        return res.status(200).json(musics)
    })

}


// EXPORT

module.exports = {
    autenticar,
    cadastrar,
    // iniciarQuiz,
    finishGame,
    quizResultado,
    buscarUltimosResultados,
    ultimosResultadosTempoReal,
    ranking
}