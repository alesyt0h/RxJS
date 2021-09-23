import { timer, interval } from 'rxjs';

const observer = {
    next: (value) => console.log('next:',value),
    complete: () => console.log('complete')
}


// Date tambien puede ser mandado a un timer
const hoyEn5 = new Date(); // ahora
hoyEn5.setSeconds(hoyEn5.getSeconds() + 5);


const interval$ = interval(1000);
// const timer$    = timer(2000,1000); // Inicia un intervalo de 1 segundo cada emisión DESPUÉS de que hayan pasado 2 segundos
const timer$    = timer(hoyEn5);

console.log('inicio');
// interval$.subscribe(observer);
timer$.subscribe(observer);
console.log('fin');