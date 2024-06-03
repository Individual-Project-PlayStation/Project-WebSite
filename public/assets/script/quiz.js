document.addEventListener("DOMContentLoaded", () => {
    var startButton = document.querySelector(".btn-comecar");
    var perguntaContainer = document.querySelector(".card-quiz");
    var respostaContainer = document.querySelector(".alternativas");
    var questionText = document.querySelector(".pergunta");
    var nextButton = document.querySelector(".btn-proxima-questao");

    startButton.addEventListener("click", startJogo);
    nextButton.addEventListener("click", displayProximaPergunta);

    var currentQuestion = 0;
    var totalCorrect = 0;

    function startJogo() {
        startButton.classList.add("hide");
        perguntaContainer.classList.remove("hide");
        displayProximaPergunta();
    }

    function displayProximaPergunta() {
        while (respostaContainer.firstChild) {
            respostaContainer.removeChild(respostaContainer.firstChild);
        }

        if (currentQuestion === questions.length) {
            return finishGame();
        }

        document.body.removeAttribute("class");
        nextButton.classList.add("hide");

        questionText.textContent = questions[currentQuestion].question;
        questions[currentQuestion].answer.forEach(answer => {
            var newAnswer = document.createElement("button");
            newAnswer.classList.add("button", "answer");
            newAnswer.textContent = answer.text;
            if (answer.correct) {
                newAnswer.dataset.correct = answer.correct;
            }
            respostaContainer.appendChild(newAnswer);

            newAnswer.addEventListener("click", selectAnswer);
        });
    }

    function selectAnswer(event) {
        var answerClicked = event.target;

        if (answerClicked.dataset.correct) {
            answerClicked.classList.add("correct");
            totalCorrect++;
        } else {
            answerClicked.classList.add("incorrect");
        }

        document.querySelectorAll(".answer").forEach(button => {
            if (button !== answerClicked) {
                button.disabled = true;
            }
        });
        nextButton.classList.remove("hide");
        currentQuestion++;
    }


    function finishGame() {
        var totalQuestion = questions.length;
        var totalIncorrect = totalQuestion - totalCorrect;
        var idUsuario = sessionStorage.ID_USUARIO;

        console.log(idUsuario, totalIncorrect, totalCorrect);

        perguntaContainer.innerHTML = `
            <h2 class= "tituloResposta">Esse foi o seu desempenho<p>Recarregue a página para jogar novamente!</p></h2>
            <div class="divCanvas" >
                <canvas id="myChartDesempenho"></canvas>
            </div>
        `;

        nextButton.classList.add("hide");

        nextButton.removeEventListener("click", displayProximaPergunta);


        fetch("/usuario/finishGame", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idUsuario: idUsuario,
                totalCorrect: totalCorrect,
                totalIncorrect: totalIncorrect
            })
        })
            .then(function (resposta) {
                console.log("ESTOU NO THEN DO quiz()!");

                if (resposta.ok) {
                    console.log(resposta);
                    resposta.json().then(json => {
                        sessionStorage.idUsuario = json.idUsuario;
                        sessionStorage.idQuiz = json.idQuiz;
                        sessionStorage.Acertos = json.totalCorrect;
                        sessionStorage.Erros = json.totalIncorrect;
                    });
                    obterDadosGrafico();
                } else {
                    console.log("Houve um erro ao terminar o quiz!");

                    resposta.text().then(texto => {
                        console.error(texto);
                    });
                }
            })
            .catch(function (erro) {
                console.log(erro);
            });

        return false;
    }

    var id = sessionStorage.ID_USUARIO;


    function obterDadosGrafico() {

        fetch("/usuario/quizResultado", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idServer: id
            })
        }).then(function (resposta) {

            console.log("quizResultado caiu aqui")

            if (resposta.ok) {
                // console.log("resposta quizGrafico" + resposta);

                resposta.json().then(json => {

                    // console.log(json);

                    // var obj = JSON.stringify(json);

                    sessionStorage.id = json.id;

                    // console.log("kauan mexeu aqui " + obj);

                    plotarGrafico_1(json);

                });



            } else {
                console.log("Houve um erro ao terminar o quiz!");

                resposta.text().then(texto => {
                    console.error(texto);

                });

            }
        }

        ).catch(function (erro) {
            console.log(erro);
        })
    };

    function plotarGrafico_1(dados) {
        console.log("Dados recebidos no plotar: ", JSON.stringify(dados));
        console.log('Iniciando plotagem do gráfico...');


        let labels = [''];
        let acertos = dados.map(item => item.acertos);
        let erros = dados.map(item => item.erros);

        let chartData = {
            labels: labels,
            datasets: [{
                label: 'Acertos',
                data: [acertos],
                // borderColor: '#B0CDDA',
                backgroundColor: 'rgba(51, 107, 176, 0.678',
                // borderWidth: 2
            },
            {
                label: 'Erros',
                data: [erros],
                // borderColor: '#EE675C',
                backgroundColor: '#EE675C',
                // borderWidth: 2
            },]
        };

        console.log('----------------------------------------------');
        console.log('Estes dados foram recebidos pela função "obterDadosGrafico" e passados para "plotarGrafico":');
        console.log(dados);

        console.log('----------------------------------------------');
        console.log('O gráfico será plotado com os respectivos valores:');
        console.log('Labels:');
        console.log(labels);
        console.log('Dados:');
        console.log(acertos, erros);
        console.log('----------------------------------------------');

        const config = {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        };

        // Adicionando gráfico criado em div na tela
        let myChart = new Chart(
            document.getElementById('myChartDesempenho'),
            config
        );
    }

    function ranking() {

        const cardContent = document.querySelector("table")
    
        fetch("/usuario/ranking")

        
    
            .then(response => response.json())
            
            .then(data => {
                console.log("miguel aqui");
    
                data.forEach(element => {
    
                    const table = document.createElement('tr')
    
                    table.innerHTML = `
                    <td>${element.nome}</td>
                    <td>${element.erros}</td>
                    <td>${element.acertos}</td>
                    `
                    cardContent.append(table)
    
                })
    
            }).catch(error => console.error(error))
    
    }

    ranking();

    var questions = [
        {
            question: "Em que ano Bob Marley nasceu?",
            answer: [
                { text: "1945", correct: true },
                { text: "1947", correct: false },
                { text: "1949", correct: false },
                { text: "1960", correct: false },
            ],
        },
        {
            question: "Qual é o nome completo de Bob Marley?",
            answer: [
                { text: "Robert Nesta Marley", correct: true },
                { text: "Robert Nigel Marley", correct: false },
                { text: "Robert Nelson Marley", correct: false },
                { text: "Robert Nathan Marley", correct: false },
            ],
        },
        {
            question: "Qual era o nome da banda de Bob Marley?",
            answer: [
                { text: "The Revolutionaries", correct: false },
                { text: "The Wailers", correct: true },
                { text: "The Skatalites", correct: false },
                { text: "The Heptones", correct: false },
            ],
        },
        {
            question: "Em que país Bob Marley nasceu?",
            answer: [
                { text: "Jamaica", correct: true },
                { text: "Estados Unidos", correct: false },
                { text: "Trinidad e Tobago", correct: false },
                { text: "Barbados", correct: false },
            ],
        },
        {
            question: "Qual foi o primeiro álbum de Bob Marley e os Wailers lançado internacionalmente?",
            answer: [
                { text: "Catch a Fire", correct: true },
                { text: "Burnin'", correct: false },
                { text: "Natty Dread", correct: false },
                { text: "Rastaman Vibration", correct: false },
            ],
        },
        {
            question: "Qual música de Bob Marley contém a famosa linha 'One good thing about music, when it hits you, you feel no pain'?",
            answer: [
                { text: "No Woman, No Cry", correct: false },
                { text: "Trenchtown Rock", correct: true },
                { text: "Redemption Song", correct: false },
                { text: "Jamming", correct: false },
            ],
        },
        {
            question: "Qual foi o último álbum de estúdio lançado por Bob Marley antes de sua morte?",
            answer: [
                { text: "Uprising", correct: true },
                { text: "Survival", correct: false },
                { text: "Confrontation", correct: false },
                { text: "Exodus", correct: false },
            ],
        },
        {
            question: "Em que ano Bob Marley faleceu?",
            answer: [
                { text: "1978", correct: false },
                { text: "1980", correct: false },
                { text: "1981", correct: true },
                { text: " 1983", correct: false },
            ],
        },
        {
            question: "Bob Marley foi um seguidor de qual religião?",
            answer: [
                { text: "Hinduísmo", correct: false },
                { text: " Islamismo", correct: false },
                { text: "Rastafarianismo", correct: true },
                { text: "Budismo", correct: false },
            ],
        },
        {
            question: "Qual destas músicas NÃO é uma canção de Bob Marley?",
            answer: [
                { text: "Three Little Birds", correct: false },
                { text: "Buffalo Soldier", correct: false },
                { text: "I Shot the Sheriff", correct: false },
                { text: "The Harder They Come", correct: true },
            ],
        },
    ];

    // var questions = [
    //     {
    //         question: "Em que ano a PlayStation foi fundada?",
    //         answer: [
    //             { text: "1999", correct: false },
    //             { text: "2000", correct: false },
    //             { text: "1994", correct: true },
    //             { text: "2005", correct: false }
    //         ]
    //     },
    //     {
    //         question: "Qual foi o primeiro console PlayStation?",
    //         answer: [
    //             { text: "PlayStation 1", correct: true },
    //             { text: "PlayStation 2", correct: false },
    //             { text: "PlayStation 3", correct: false },
    //             { text: "PlayStation 4", correct: false }
    //         ]
    //     }
    // ];
});
