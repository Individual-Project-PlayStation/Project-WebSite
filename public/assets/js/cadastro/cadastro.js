function cadastrar() {

    // INPUTS

    var nomeVar = inp_nome.value;
    var emailVar = inp_email.value;
    var senhaVar = inp_senha.value;
    var confirmarVar = inp_confirmar.value;


    // VERIFICAÇÕES

    // VERIFICA SE OS CAMPOS ESTÃO PREENCHIDOS PARA PODER PROSSEGUIR

    if (nomeVar != '' || emailVar != '' || senhaVar != '' || confirmarVar != '') {

        // SENHA INCORRETA (CONFIRMAR É DIFERENTE DA SENHA)

        if (confirmarVar != senhaVar) {
            alert('senha incorreta!');
            return;
        }

    }

    else {
        alert('Preencha os Campos');
    }

    fetch("/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        }),
    })

        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

                setTimeout(() => {
                    // window.location = "login.html";
                }, "2000");
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}