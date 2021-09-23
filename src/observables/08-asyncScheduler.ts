import { asyncScheduler } from 'rxjs';

// setTimeout (() => {}, 3000);
// setInterval(() => {}, 3000);


/**
 * setTimeout pasado a async
 */
const saludar  = () => console.log('Hola Mundo');
const saludar2 = (nombre) => console.log(`Hola ${nombre}`);
const saludar3 = ({nombre, apellido}) => console.log(`Hola ${nombre}`);

// asyncScheduler.schedule(saludar, 2000);
// asyncScheduler.schedule(saludar2, 2000, 'Alejandro');
asyncScheduler.schedule(saludar3, 2000, {nombre: 'Alejandro', apellido: 'Ortigosa'});


/**
 * setInterval pasado a async
 */

// Para un intervalo, no puede ser una función de flecha
const subs = asyncScheduler.schedule(function(state){

    console.log('state', state);

    this.schedule(state + 1, 1000)

}, 3000, 0 );

// setTimeout(() => {
//     subs.unsubscribe();
// }, 6000);

asyncScheduler.schedule( () => subs.unsubscribe(), 6000);