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
        SELECT acertos, erros FROM tbMetrica WHERE fkUsuario = ${idUsuario} and fkQuiz = (SELECT MAX(fkQuiz) FROM tbMetrica WHERE fkUsuario = ${idUsuario});
    `;

    return database.executar(instrucaoSql);

    // SELECT SUM(acertos) AS 'Acertos', SUM(erros) AS 'Erros' FROM tbMetrica WHERE fkUsuario = ${idUsuario};

}

function buscarUltimosResultados(idUsuario, limite_linhas) {

    var instrucaoSql = `SELECT acertos FROM tbMetrica WHERE fkUsuario = ${idUsuario} ORDER BY idMetrica DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function ultimosResultadosTempoReal(idUsuario) {

    var instrucaoSql = `SELECT acertos FROM tbMetrica WHERE fkUsuario = ${idUsuario} ORDER BY idMetrica DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function ranking() {

    var instrucaoSql = `
        SELECT tbUsuario.nome, fkQuiz, erros, acertos FROM tbMetrica 
	        join tbUsuario 
		        on idUsuario = fkUsuario	
			        ORDER BY acertos DESC;
    `;

    return database.executar(instrucaoSql);

}


module.exports = {
    autenticar,
    cadastrar,
    createQuiz,
    finishGame,
    quizResultado,
    buscarUltimosResultados,
    ultimosResultadosTempoReal,
    ranking
};