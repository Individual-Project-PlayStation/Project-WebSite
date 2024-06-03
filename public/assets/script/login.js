function logar() {

    var emailVar = inp_email.value;
    var senhaVar = inp_senha.value;

    if (emailVar == "" || senhaVar == "") {

        console.log('Preencha os campos!');
        return;
    }

    const data = {
        emailServer: emailVar,
        senhaServer: senhaVar
    }

    fetch("/usuario/autenticar", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })

        .then(response => {

            if (response.ok) {

                response.json().then(data => {

                    sessionStorage.ID_USUARIO = data.response[0].idUsuario;
                    sessionStorage.EMAIL_USUARIO = data.response[0].email;
                    sessionStorage.NOME_USUARIO = data.response[0].nome;

                    console.log('redirecionando para a dash!');

                    setTimeout(() => {
                        window.location = "../view/dash.html";
                    }, 1000);

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");
                alert('Credenciais incorretas!');

                response.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

}