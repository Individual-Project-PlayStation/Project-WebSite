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

                var posicao = 1;
                data.forEach(element => {
                    const table = document.createElement('tr')

                    table.innerHTML = `
                    <td>${posicao++}</td>
                    <td>${element.nome}</td>
                    <td>${element.fkQuiz}</td>
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
            question: "Em que ano foi lançado o primeiro PlayStation?",
            answer: [
                { text: "1994", correct: true },
                { text: "1995", correct: false },
                { text: "1996", correct: false },
                { text: "1997", correct: false },
            ],
        },
        {
            question: "Qual foi o primeiro console portátil da Sony?",
            answer: [
                { text: "PSP Go", correct: false },
                { text: "PlayStation Portable (PSP)", correct: true },
                { text: "PlayStation Vita", correct: false },
                { text: "PlayStation 3", correct: false },
            ],
        },
        {
            question: "Quantas unidades o PlayStation 2 vendeu no mundo?",
            answer: [
                { text: "100 milhões", correct: false },
                { text: "200 milhões", correct: false },
                { text: "155 milhões", correct: true },
                { text: "120 milhões", correct: false },
            ],
        },
        {
            question: "Qual a principal inovação do controle DualShock 2?",
            answer: [
                { text: "Botões analógicos que detectam o nível de pressão", correct: true },
                { text: "Barra luminosa", correct: false },
                { text: "Touch pad", correct: false },
                { text: "Microfone integrado", correct: false },
            ],
        },
        {
            question: "Em que ano o PlayStation 3 foi lançado nos EUA?",
            answer: [
                { text: "2006", correct: true },
                { text: "2005", correct: false },
                { text: "2007", correct: false },
                { text: "2008", correct: false },
            ],
        },
        {
            question: "Qual serviço de jogos em nuvem foi lançado em 2014?",
            answer: [
                { text: "PlayStation Plus", correct: false },
                { text: "PlayStation Network", correct: false },
                { text: "PlayStation Now", correct: true },
                { text: "PlayStation Store", correct: false },
            ],
        },
        {
            question: "O que o controle DualSense do PS5 oferece?",
            answer: [
                { text: "Touch pad e barra luminosa", correct: false },
                { text: "Feedback tátil imersivo e gatilhos dinâmicos", correct: true },
                { text: "Alto-falante embutido e microfone integrado", correct: false },
                { text: "Botões analógicos e sensor de movimento", correct: false },
            ],
        },
        {
            question: "Qual foi o recurso de mídia adicionado ao PS2?",
            answer: [
                { text: "Blu-ray", correct: false },
                { text: "CD-ROM", correct: false },
                { text: "PlayStation VR", correct: false },
                { text: "Driver de DVD integrado", correct: true },
            ],
        },
        {
            question: "Quantos jogos foram lançados para o PlayStation 2?",
            answer: [
                { text: "Quase 2 mil", correct: false },
                { text: "Quase 3 mil", correct: false },
                { text: "Quase 4 mil", correct: true },
                { text: "Quase 5 mil", correct: false },
            ],
        },
        {
            question: "Qual a resolução máxima suportada pelo PlayStation 5?",
            answer: [
                { text: "4K", correct: false },
                { text: "1080p", correct: false },
                { text: "8K", correct: true },
                { text: "720p", correct: false },
            ],
        },
    ];
    
});