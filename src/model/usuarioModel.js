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

module.exports = {
    autenticar,
    cadastrar
};