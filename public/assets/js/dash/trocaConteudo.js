document.addEventListener("DOMContentLoaded", function () {


    // ADICIONA UM OUVINTE DE CLICK EM CADA ITEM DA LISTA DO MENU


    document.getElementById("sessao-quiz").addEventListener("click", function () {


        // MOSTRA O CONTEÚDO DA DASH E ESCONDE OS OUTROS

        document.getElementById("quiz-container").style.display = "block";
        document.getElementById("ranking-container").style.display = "none";
        document.getElementById("progresso-container").style.display = "none";


    });

    document.getElementById("sessao-ranking").addEventListener("click", function () {

        document.getElementById("ranking-container").style.display = "block";
        document.getElementById("quiz-container").style.display = "none";
        document.getElementById("progresso-container").style.display = "none";
            
    });

    document.getElementById("sessao-progresso").addEventListener("click", function () {

        document.getElementById("progresso-container").style.display = "block";
        document.getElementById("ranking-container").style.display = "none";
        document.getElementById("quiz-container").style.display = "none";
            
    });

});