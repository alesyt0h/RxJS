import { Observer, range } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const observer: Observer<any> = {
    next: value => console.log('siguiente [next]:', value),
    error: error => console.warn('error [obs]:', error),
    complete: () => console.info('completado [obs]')
}

const numeros$ = range(1,5);

numeros$.pipe(
    // tap(observer) // El tap tambien acepta un observer
    tap( x => {
        console.log('antes', x);
        return 100; // Dentro de un tap un return es ignorado
    }),
    map( val => val * 10),
    tap({
        next: value => console.log('después', value),
        complete: () => console.log('Se terminó todo')
    })
)
.subscribe( val => console.log('subs', val));