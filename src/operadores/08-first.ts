import { fromEvent } from 'rxjs';
import { tap, first, map, pluck } from 'rxjs/operators';

const click$ = fromEvent<PointerEvent>(document,'click');

click$.pipe(
    tap<PointerEvent>(console.log),
    // map(event => ({
    //     clientX: event.clientX,
    //     clientY: event.clientY
    // }))
    // Resumido =>
    map(({ clientX, clientY }) => ({ clientX, clientY })),
    first(event => event.clientY >= 150),
    //
    // With Pluck
    //
    // pluck('clientY'),
    // first(event => event >= 150)
).subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
});