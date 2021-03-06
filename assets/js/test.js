// JavaScript source code
var timestart = 0;
var timestamps = [];
var counter = 0
var countFlag = false;
var keyUpFlag = true;
var testTime = 15000;
var currentTest = 0;
let barra = document.getElementById('barra');
let tab_p1 = document.getElementById('p1-tab');
let tab_p2 = document.getElementById('p2-tab');
let tab_p3 = document.getElementById('p3-tab');
let tab_p4 = document.getElementById('p4-tab');
let tab_final = document.getElementById('final-tab');
let prueba1 = document.getElementById('prueba1');
let prueba2= document.getElementById('prueba2');
let prueba3 = document.getElementById('prueba3');
let prueba4 = document.getElementById('prueba4');
let final = document.getElementById('final');
let btn_continuar_p1 = document.getElementById('btn_continuar_p1');
let btn_continuar_p2 = document.getElementById('btn_continuar_p2');
let btn_continuar_p3 = document.getElementById('btn_continuar_p3');
let btn_continuar_fin = document.getElementById('btn_continuar_fin');
let tab_spacebar = document.getElementById('tab_spacebar');
let spacebar = document.getElementById('spacebar');
let spacebar_pressed = document.getElementById('spacebar_pressed');
let timer_inicio = document.getElementById('timer_inicio');
let timer_test = document.getElementById('timer_test');
let container_spacebar = document.getElementById('cont_spacebar');
let btn_mobile =  document.getElementById('btn-mobile');


function recordEntry() {
    if (countFlag && (Date.now() - timestart) < testTime) {
        counter++;
        timestamps.push(Date.now() - timestart);
    }
}

function finishTest() {
    //En esta secci�n es para imprimir resultados, de ac� se puede mandar a la base de datos
    intervals = []
    counter = 0;
    currentTest++;
    for (let index = 1; index < timestamps.length; index++) {
        intervals.push(timestamps[index] - timestamps[index - 1])
    }
    document.getElementById("PrintZone0").innerHTML = timestamps;
    document.getElementById("PrintZone1").innerHTML = intervals;
    countFlag = false;
}

$(document).keydown(function (event) {
    if (keyUpFlag) {
        keyUpFlag = false;
        spacebar.style.display = 'none';
        spacebar_pressed.style.display = 'initial';
        recordEntry();
    }
});

$(document).keyup(function (event) {
    if (keyUpFlag == false) {
        keyUpFlag = true;
    }

    spacebar_pressed.style.display = 'none';
    spacebar.style.display = 'initial';    
});

const soundArr = document.querySelectorAll(".sound")

$(document).ready(function () {
    $("#botonlocochon1").click(function () {
        prueba1.className = 'tab-pane fade';
        comenzar_prueba(0);
    });
});
$(document).ready(function () {
    $("#botonlocochon2").click(function () {
        prueba2.className = 'tab-pane fade';
        comenzar_prueba(1);
    });
});

$(document).ready(function () {
    $("#botonlocochon3").click(function () {
        $(".botonlocochon").hide();
        prueba3.className = 'tab-pane fade';
        comenzar_prueba(2);
    });
});

$(document).ready(function () {
    $("#botonlocochon4").click(function () {
        prueba4.className = 'tab-pane fade';
        comenzar_prueba(3);
    });
});


function comenzar_prueba(sound) {

    timer_test.innerHTML = '23 segundos';
    tab_spacebar.className = 'tab-pane fade show active';

    sleep(3000);

    if (sound == 0) {
        soundArr[1].play();
    } else if (sound == 1) {
        soundArr[0].play();
    } else if (sound == 2) {
        soundArr[2].play();
    } else {
        soundArr[3].play();
    }

    setTimeout(setFlags, 8000);
    setTimeout(finishTest, 23000);

    start = new Date().getTime();

    var x = setInterval(function () {

        // Find the distance between now and the count down date
        var distance = new Date().getTime() - start;

        var seconds = 23 - Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        timer_test.innerHTML = seconds + " segundos";

        // If the count down is finished, write some text
        if (distance > 23000) {
            clearInterval(x);
            timer_test.innerHTML = "Prueba terminada";
            if (sound == 0) {
                btn_continuar_p1.style.display = 'initial';
            } else if (sound == 1) {
                btn_continuar_p2.style.display = 'initial';
            } else if (sound == 2) {
                btn_continuar_p3.style.display = 'initial';
            } else {
                btn_continuar_fin.style.display = 'initial';
            }           
            
        }
    }, 1000);
}

function setFlags() {
    timestart = Date.now();
    countFlag = true;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function continuar_p1() {
    btn_continuar_p1.style.display = 'none';
    tab_spacebar.className = 'tab-pane fade';
    prueba2.className = 'tab-pane fade show active';
    tab_p1.className = 'nav-link disabled';
    tab_p2.className = 'nav-link active disabled';
    barra.style.width = '25%';
    barra.innerHTML = '25%';
}

function continuar_p2() {
    btn_continuar_p2.style.display = 'none';
    tab_spacebar.className = 'tab-pane fade';
    prueba3.className = 'tab-pane fade show active';
    tab_p2.className = 'nav-link disabled';
    tab_p3.className = 'nav-link active disabled';
    barra.style.width = '50%';
    barra.innerHTML = '50%';
}

function continuar_p3() {
    btn_continuar_p3.style.display = 'none';
    tab_spacebar.className = 'tab-pane fade';
    prueba4.className = 'tab-pane fade show active';
    tab_p3.className = 'nav-link disabled';
    tab_p4.className = 'nav-link active disabled';
    barra.style.width = '75%';
    barra.innerHTML = '75%';
}

function continuar_fin() {
    btn_continuar_fin.style.display = 'none';
    tab_spacebar.className = 'tab-pane fade';
    final.className = 'tab-pane fade show active';
    tab_p4.className = 'nav-link disabled';
    tab_final.className = 'nav-link active disabled';
    barra.style.width = '100%';
    barra.innerHTML = '100%';
}

btn_continuar_p1.addEventListener('click', continuar_p1);
btn_continuar_p2.addEventListener('click', continuar_p2);
btn_continuar_p3.addEventListener('click', continuar_p3);
btn_continuar_fin.addEventListener('click', continuar_fin);

function mobile_pressed() {
    btn_mobile.style.backgroundColor = '#59311b';
    if (keyUpFlag) {
        keyUpFlag = false;
        recordEntry();
    }
}

function mobile_released() {
    btn_mobile.style.backgroundColor = '#f58549';
    if (keyUpFlag == false) {
        keyUpFlag = true;
    }
}

btn_mobile.addEventListener('touchstart', mobile_pressed);
btn_mobile.addEventListener('touchend', mobile_released);