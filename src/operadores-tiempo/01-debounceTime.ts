import { debounceTime, fromEvent } from 'rxjs';
import { map, pluck, distinctUntilChanged } from 'rxjs/operators';

const click$ = fromEvent(document,'click');

click$.pipe(
    debounceTime(3000)
)//.subscribe(console.log)

// Ejemplo 2
const input = document.createElement('input');
document.body.append(input);

const input$ = fromEvent(input,'keyup');

input$.pipe(
    // map(e => e.target.value),
    debounceTime(1000),
    pluck('target','value'), // No necesita tipado a diferencia del map
    distinctUntilChanged()
).subscribe(console.log)