import { of } from 'rxjs';

// El of trabaja de manera síncrona -- Los valores deben de ser mandados con coma, si se mandara un arreglo se tomaria como un unico argumento, se podria usar el operador spread para mandar todos como valores individuales, produciendo lo mismo que sin [ ]
// const obs$ = of<number>(1,2,3,4,5,6);
// const obs$ = of<number>(...[1,2,3,4,5,6]);
const obs$ = of<any>([1,2], {a: 1, b: 2}, function(){}, true, Promise.resolve(true));


console.log('Inicio del Obs$');
obs$.subscribe({
    next: (next) => console.log('next:',next),
    error: null,
    complete: () => console.log('Terminamos la secuencia')
});
console.log('Fin del Obs$');