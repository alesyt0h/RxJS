import { fromEvent, asyncScheduler } from 'rxjs';
import { throttleTime, pluck, distinctUntilChanged } from 'rxjs/operators';

const click$ = fromEvent(document,'click');

click$.pipe(
    throttleTime(3000)
)//.subscribe(console.log)

// Ejemplo 2
const input = document.createElement('input');
document.body.append(input);

const input$ = fromEvent(input,'keyup');

input$.pipe(
    throttleTime(400,asyncScheduler, {
        leading: false,
        trailing: true
    }),
    pluck('target','value'), // No necesita tipado a diferencia del map
    distinctUntilChanged()
).subscribe(console.log)