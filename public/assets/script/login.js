function logar() {

    var emailVar = inp_email.value;
    var senhaVar = inp_senha.value;

    if (emailVar == "" || senhaVar == "") {

        console.log('Preencha os campos!');
        return;
    }

    fetch("/usuario/autenticar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    })

        .then((response) => {

            if (response.ok) {

                response.json().then(json => {

                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;

                    console.log('redirecionando para alguma tela!');

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