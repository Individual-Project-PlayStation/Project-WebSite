const submit = document.querySelector('btn_cadastrar');

function cadastrar() {

    // INPUTS

    var nome = inp_nome.value;
    var email = inp_email.value;
    var senha = inp_senha.value;
    var confirmarSenha = inp_confirmar.value;


    // VERIFICAÇÕES

    // VERIFICA SE OS CAMPOS ESTÃO PREENCHIDOS PARA PODER PROSSEGUIR

    if (nome != '' && email != '' && senha != '' && confirmarSenha != '') {


        // EMAIL SEM '@'

        if (!email.includes('@')) {

            alert('Email precisa conter "@"');
            return;

        }

        // EMAIL SEM '.com'

        if (!email.endsWith('.com')) {

            alert('Email precisa terminar com ".com"');
            return;

        }

        // SENHA COM MENOS DE 6 CARACTERES

        if (senha.length <= 6) {

            alert('Senha precisa ter mais de 6 caracteres!');
            return;

        }

        // SENHA INCORRETA (CONFIRMAR É DIFERENTE DA SENHA)

        if (confirmarSenha != senha) {

            alert('senha incorreta!');
            return;

        }


        // REQUISIÇÃO PARA API

        fetch("/usuario/cadastrar", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha
            })
        })

            .then((resposta) => {

                if (resposta.ok) {

                    // submit.value = "Usuario Cadastrado"

                    console.log("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

                    setTimeout(() => {
                        window.location = "login.html"
                    }, 2000)

                }

                else {

                    throw "Houve um erro ao tentar realizar o cadastro!";

                }

            })

            .catch(erro => console.error(erro));

    }


    // CENARIO CONTRÁRIO - CAMPOS NÃO ESTÃO PREENCHIDOS

    else {

        alert('Preencha os Campos');

    }

}