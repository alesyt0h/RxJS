import { from } from 'rxjs';
import { reduce,scan, map } from 'rxjs/operators';

const numeros = [1,2,3,4,5];

const totalAcumulador = (acc, cur) => acc + cur;


// Reduce
from(numeros).pipe(
    reduce(totalAcumulador)
)
.subscribe(console.log);

// Scan
from(numeros).pipe(
    scan(totalAcumulador)
)
.subscribe(console.log);

// Redux Alike
interface Usuario {
    id?: string;
    autenticado?: boolean;
    token?: string;
    edad?: number;

}
const user: Usuario[] = [
    { id: 'alex', autenticado: false, token: null },
    { id: 'alex', autenticado: true, token: 'ABC' },
    { id: 'alex', autenticado: true, token: 'ABC123' },
];

const state$ = from(user).pipe(
    scan( (acc, cur) => {
        return { ...acc, ...cur }
    }, { edad: 33 })
);

const id$ = state$.pipe(
    map(state => state)
);

id$.subscribe(console.log)