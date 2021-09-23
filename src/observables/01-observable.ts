import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('siguiente [next]:', value),
    error: error => console.warn('error [obs]:', error),
    complete: () => console.info('completado [obs]')
}



const obs$ = new Observable<string>( subs => {

    subs.next('Hola');
    subs.next('Mundo');

    subs.next('Hola');
    subs.next('Mundo');

    // Forzar un error
    // const a = undefined;
    // a.nombre = 'Alejandro';


    subs.complete();

    // Estas lineas no serian emitidas
    subs.next('Hola');
    subs.next('Mundo');
});

obs$.subscribe(observer);

// Subscribe with more than one arguments like this is deprecated
//
// obs$.subscribe(
//     valor => console.log('next:', valor),
//     error => console.warn('error:', error),
//     () => console.info('Completed')
// );

// obs$.subscribe({
//     next: (resp) => console.log('next:',resp),
//     error: (err) => console.warn('Error: ',err),
//     complete: () => console.info('Completado')
// });