let count1 = 1;
let count2 = 5;
let count3 = 9;
let count4 = 13;
let count5 = 17;
let count6 = 21;
let count7 = 25;

document.getElementById("radio1").checked = true;
document.getElementById("radio5").checked = true;
document.getElementById("radio9").checked = true;
document.getElementById("radio13").checked = true;
document.getElementById("radio17").checked = true;

setInterval(function() {

    proximaImagem();

}, 3000)

function proximaImagem() {

    count1++;
    count2++;
    count3++;
    count4++;
    count5++;
    count6++;
    count7++;

    if (count1 > 4) {
        count1 = 1;
    }

    if (count2 > 8) {
        count2 = 5;
    }

    if (count3 > 12) {
        count3 = 9;
    }

    if (count4 > 16) {
        count4 = 13;
    }

    if (count5 > 20) {
        count5 = 17;
    }

    if (count6 > 24) {
        count6 = 21;
    }

    if (count7 > 28) {
        count7 = 25;
    }

    document.getElementById("radio" + count1).checked = true;

    document.getElementById("radio" + count2).checked = true;

    document.getElementById("radio" + count3).checked = true;

    document.getElementById("radio" + count4).checked = true;

    document.getElementById("radio" + count5).checked = true;

    document.getElementById("radio" + count6).checked = true;
    
    document.getElementById("radio" + count7).checked = true;

}