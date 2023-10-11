/**
 *  2C = TWO OF VLUBS
 *  2D
 *  2H
 *  2S
 */


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const puntosHtml = document.querySelectorAll('small');
let divCartasJugador = document.querySelector('#jugador-carta');
let divCartasComputasora = document.querySelector('#computadora-carta');

//  CREA UNA NUEVA BARAJA
const crearDeck = () => {
    for (let index = 2; index <= 10; index++) {

        for (const tipo of tipos) {
            deck.push(index + tipo)

        }
    }

    for (const tipo of tipos) {
        for (const especial of especiales) {
            deck.push(especial + tipo);
        }
    }

    deck = _.shuffle(deck);
    return deck;
}

crearDeck();


// ESTA FUNCION PERMITE TOMAR UNA CARTA

const pedirCarta = () => {

    const carta = deck.pop();
    console.log(carta);
    console.log(deck);
    return carta;
}


// pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}


btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);


    if (puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    }

});


btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})


btnNuevo.addEventListener('click', () => {

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;
    deck = [];
    deck = crearDeck();
    puntosComputadora       = 0;
    puntosJugador           = 0;
    while (divCartasComputasora.firstChild) {
        divCartasComputasora.removeChild(divCartasComputasora.firstChild);
    }
    while (divCartasJugador.firstChild) {
        divCartasJugador.removeChild(divCartasJugador.firstChild);
    }
    btnPedir.disabled       = false;
    btnDetener.disabled     = false;

});

// TURNO PC
const turnoComputadora = (puntoMinimos) => {

    do {

        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasComputasora.append(imgCarta);

        if (puntoMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntoMinimos) && (puntoMinimos <= 21));

    setTimeout(() => {
        if( puntosComputadora === puntoMinimos){
            alert('Nadie gana :(');
        }else if( puntoMinimos > 21){
            alert('Computadora gana');
        }else if(puntosComputadora > 21){
            alert('Jugador gana');
        }else {
            alert('Computadora gana');
        }
    }, 10);

}
