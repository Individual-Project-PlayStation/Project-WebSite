let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function() {

    proximaImagem();

}, 3000)

function proximaImagem() {

    count++;

    if (count > 4) {
        count = 1;
    }

    document.getElementById("radio" + count).checked = true;

}