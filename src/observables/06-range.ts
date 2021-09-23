import { asyncScheduler, observeOn, of, range } from 'rxjs';

// const src$ = of(1,2,3,4,5);

// Use of asyncScheduler on range is deprecated, must use the pipe with observeOn
// const src$ = range(1,5,asyncScheduler);
const src$ = range(1,5).pipe(observeOn(asyncScheduler));

console.log('inicio');
src$.subscribe(console.log);
console.log('fin');