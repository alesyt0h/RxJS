import { Observer, Observable, Subject } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('next:', value),
    error: error => console.warn('error:', error),
    complete: () => console.info('completado')
}

const intervalo$ = new Observable<number>( subs => {

    const intervalID = setInterval( ()=> {
        subs.next(Math.random());
    }, 1000 );

    return () => {
        clearInterval(intervalID);
        console.log('Intervalo destruido');
    }
    
});

/**
 * 1- Casteo múltiple (La misma información va a ser transmitida a todos los subscriptores)
 * 2- También es un observer
 * 3- Next, Error y Complete
 */

const subject$ = new Subject();
const subscription = intervalo$.subscribe(subject$);


// const subs1 = intervalo$.subscribe(rnd => console.log('Subs 1:', rnd));
// const subs2 = intervalo$.subscribe(rnd => console.log('Subs 2:', rnd));

// const subs1 = subject$.subscribe(rnd => console.log('Subs 1:', rnd));
// const subs2 = subject$.subscribe(rnd => console.log('Subs 2:', rnd));
const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

setTimeout(() => {
    
    subject$.next(10);

    subject$.complete();

    subscription.unsubscribe();

}, 3500 );