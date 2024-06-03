// IMPORT

var database = require("../database/config")


// AUTENTICAR

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT * FROM tbUsuario WHERE email = '${email}' AND senha = '${senha}';
    `;

    return database.executar(instrucaoSql);

}


// CADASTRAR

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO tbUsuario (nome, email, senha) VALUES 
        ('${nome}', '${email}', '${senha}');
    `;

    return database.executar(instrucaoSql);

}


// CRIAR QUIZ

function createQuiz() {
    var instrucaoSql = `
        INSERT INTO tbQuiz (dataInicio) VALUES (NOW());
    `;
    return database.executar(instrucaoSql);
}

// FINALIZAR QUIZ

function finishGame(idUsuario, idQuiz, acertos, erros) {
    var instrucaoSql = `
        INSERT INTO tbMetrica (fkUsuario, fkQuiz, acertos, erros) VALUES 
        ('${idUsuario}', '${idQuiz}', '${acertos}', '${erros}');
    `;

    return database.executar(instrucaoSql);

}


// RESULTADO DO QUIZ

function quizResultado(idUsuario) {
    var instrucaoSql = `
        SELECT SUM(acertos) AS 'Acertos', SUM(erros) AS 'Erros' FROM tbMetrica WHERE fkUsuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql);

}

module.exports = {
    autenticar,
    cadastrar,
    createQuiz,
    finishGame,
    quizResultado
};