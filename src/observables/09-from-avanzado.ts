import { of, from } from 'rxjs';

/**
 * of = toma argumentos y genera una secuencia
 * from = array, promise, iterable, observable
 */

const observer = {
    next: (value) => console.log('next:',value),
    complete: () => console.log('complete')
}

// const source$ = from([1,2,3,4,5]); // Output: 1, 2, 3, 4, 5
// const source$ = of([1,2,3,4,5]);   // Output: [1, 2, 3, 4, 5]

// const source$ = from('Alejandro'); // Output: A, l, e, j, a, n, d, r, o
// const source$ = of('Alejandro');   // Output: Alejandro

// const source$ = from(fetch('https://api.github.com/users/alesyt0h'));

// source$.subscribe( async(resp) => {
//     console.log(resp);

//     const data = await resp.json()
//     console.log(data)
// });

const miGenerador = function*(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

const miIterable = miGenerador();

// for(let id of miIterable){
//     console.log(id);
// }
from(miIterable).subscribe(observer);