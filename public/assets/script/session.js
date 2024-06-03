document.addEventListener("DOMContentLoaded", function () {

    var sairDaConta = document.getElementById("sair-da-conta");

    if (sairDaConta) {
        sairDaConta.addEventListener("click", function () {
            limparSessao();
        });
    } 

});

function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var usuario = document.getElementById("usuario");

    if (email != null && nome != null) {
        usuario.innerHTML = nome;
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}