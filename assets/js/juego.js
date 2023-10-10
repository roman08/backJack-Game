/**
 *  2C = TWO OF VLUBS
 *  2D
 *  2H
 *  2S
 */


let deck = [];
const tipos = [ 'C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];  

let puntosJugador = 0;
let puntosComputadora = 0;

const btnPedir = document.querySelector('#btnPedir');
const puntosHtml = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-carta');
//  CREA UNA NUEVA BARAJA
const crearDeck = () => {
    for (let index = 2; index <= 10; index++) {

        for (const tipo of tipos) {
            deck.push( index + tipo)        
            
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

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length -1 );
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


    if(puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
    }else if(puntosJugador === 21 ){
        console.warn('21, genial');
        btnPedir.disabled = true;
    }

});