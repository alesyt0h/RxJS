import { interval, fromEvent } from 'rxjs';
import { takeUntil, tap, skip } from 'rxjs/operators';

const boton = document.createElement('button');
boton.innerHTML = 'Detener Timer';
document.body.append(boton);

const counter$  = interval(1000);
// const clickBtn$ = fromEvent(boton,'click');
const clickBtn$ = fromEvent(boton,'click').pipe(
    tap(() => console.log('tap antes del skip')),
    skip(1),
    tap(() => console.log('tap después del skip')),
);

const sub = counter$.pipe(
    // takeUntil(fromEvent(boton,'click'))
    takeUntil(clickBtn$)
)
.subscribe({
    next: val => console.log('next:',val),
    complete: () => console.log('completed')
});


