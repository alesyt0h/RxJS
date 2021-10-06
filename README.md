# Observables

* Cómo estandar a los nombres de los observables se les añade un `$` al final, para poder identificarlos mejor: `const obs$`
* Creación de un observable de forma manual: 
```javascript
const obs$ = new Observable( subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);

    subscriber.complete();
});
```
* **Observer**: Pueden ser enviados directamente a un subscriptor, pueden contar con un **next**, un **error** y un **complete**
```javascript
const observer: Observer<any> = {
    next: value => console.log('[next]:', value),
    error: error => console.warn('[error]:', error),
    complete: () => console.info('[completed]')
}
```
* **Subscriber**: Los subscriptores que cuenten con más de un argumento, es decir next, error y/complete deben de ser enviados como un observer: `next: .. `- `error: ... `
* **Unsubscribe**: Para poder ejecutar un desuscripción, deberiamos asignar la suscripción a una variable, y despues hacer referencia a esta usando `.unsubscribe()`
* Para ejecutar una linea de código en el momento de la desuscripción, en el observer debe de estar incluido un return:
```javascript
return {
    clearInterval(intervalo);
    console.log('Intervalo Destruido');
}
```
* **Add**: Observables en cadena - Usando por ejemplo: `subs1.add(subs2); subs1.add(subs3)` al momento de efectuar la desuscripción al subs1, nos desuscribiriamos también del `subs2` y del `subs3`. 
* **Subject**: Un subject nos permite un casteo múltiple, es decir, la información de un observable va a ser retransmitida de forma exactamente igual para cualquier subscriptor, ejemplo un observable que nos podruce valores random para cada subscriptor, con subject nos devolveria la misma información a todos los suscriptores.
* Un **subject** también es un **Observer**, cuenta con su `next`, `error` y `complete`. Creación de un subject:
```javascript
const subject$ = new Subject();
const subscription = intervalo$.subscribe(subject$); // El subject se suscribe al observable

// Nos suscribimos al subject
const subs1 = subject$.subscribe(rnd => console.log('Subs 1:', rnd));
const subs2 = subject$.subscribe(rnd => console.log('Subs 2:', rnd));
```
* **Cold Observable**: Cuando la data es producida por el observable en sí mismo.
* **Hot Observable**: Cuando la data es producida FUERA del observable.

# Funciones para crear Observables

* **of**: Convierte los argumentos a un observable, puede ser un *numero*, *string*, *objeto*, *array*, *promesa*, *booleano*, *function*, *lambda function* ... Trabaja de manera síncrona. Los valores deben de ser mandados con coma, si se mandara un arreglo se tomaria como un unico argumento, se podría usar el operador spread para mandar todos como valores individuales, produciendo lo mismo que sin **[ ]**
* **from**: Convierte a un observable desde una *array*, *objeto*, *promesa*, *iterable*, *función generadora*, o un *objeto observable*.
#### **of** & **from** comparativa
```javascript
const source$ = from([1,2,3,4,5]); // Output: 1, 2, 3, 4, 5
const source$ = of([1,2,3,4,5]);   // Output: [1, 2, 3, 4, 5]

const source$ = from('Alejandro'); // Output: A, l, e, j, a, n, d, r, o
const source$ = of('Alejandro');   // Output: Alejandro
```
* **fromEvent**: Crea un observable que emite un evento del tipo específico asignado: `fromEvent(document,'click')`
* **range**: Crea un observable que emite una secuencia de numeros dentro de un rango específico. Específicando solo un valor emite ese número de veces empezando desde el 0:
```javascript
range(2) // Emits 0, 1
range(1,5) // Emits 1, 2, 3, 4, 5
```
* **interval**: Crea un observable que emite una secuencia de números cada intervalo especificado de manera infinita: `interval(1000)`. Si no se especifica ningun valor: `interval()` el intervalo se ejecutaría cada milisegundo.
* **timer**: Crea un observable que espera el tiempo asignado o **fecha** antes de ejecutarse. Se puede usar junto con *pipe* y *map* para que ejecute la función se quiera.
* **asyncScheduler**: Programa una tarea para que sea ejecutada en el tiempo específico, haciendo a esa tarea o función **asíncrona**: 
### Parecido a un setTimeout usando asynScheduler
```javascript
// Esta función seria ejecutada al cabo de 3 segundos
const saludar = () => console.log('Hola Mundo');
asyncScheduler.schedule(saludar,3000)
// Para enviar argumentos a la función, debe de ser como un ESTADO detrás del intervalo.
const saludar = (nombre) => console.log(`Hola ${nombre}`);
asyncScheduler.schedule(saludar,3000,'Alejandro') // Se puede enviar también un objeto: {nombre: 'Alejandro'}
```
### Parecido a un setInterval usando asynScheduler
```javascript
// No puede ser una función de flecha, la razón es que para hacer un intervalo vamos a tener que usar el THIS,
// que solo esta disponible las funciones normales. Esta función tambien puede estar separada en otra parte del código
const subs = asyncScheduler.schedule(function (state){
    console.log('state',state);

    this.schedule(state + 1, 1000)
}, 3000, 0)

// También podemos desuscribirnos usando un asyncScheduler en lugar de un setTimeout
asyncScheduler.schedule( () => subs.unsubscribe(), 6000 )
```

# Operadores básicos

* **map**: Nos permite transformar lo que emite el observable por lo que nososotros queramos, se puede usar para desestructurar el valor emitido. En el caso que *map* no pueda encontrar la propiedad de un objeto anidado se deberia usar de la siguiente manera: `map( event => event.target['value'] )`
* **mapTo**: Transforma las emisiones del observable a una salida específica: `mapTo('Hola Mundo')`
* **~~pluck~~**: *(Deprecated)* Permite extraer la propiedad de un objeto. `pluck('target')` -- `pluck('target', 'value')`  
* **filter**: Nos permite filtrar las emisiones que emiten los observables con una condición especifica. `filter(value => value % 2 === 1` Solo llegarian a la salida los números impares.
* **tap**: Operador para ejecutar acciones secundarias. Ya sea mostrar en consola, como disparar otro operador para efectuar otra accion, etc…
* **reduce**: Aplica una función acumuladora a las emisiones producidas por el observable:
```javascript
// Recibe el valor acumulado y el actual. Retorna el valor acumulado sumado al actual. 
// Pero sólo emitira cuando se completa el observable, retornando el valor total.
reduce( (acc, cur) => acc + cur, 0 )
```
* **scan**: Exactamente lo mismo al operador **reduce**, la única diferencia es que los valores son emitidos a la salida mostrando el valor acumulado.
* **Laboratorio progressBar**: Creación de un progressBar al hacer scroll que se va rellenando en función de cuanto scroll hagamos en la página, usando *fromEvent* para escuchar el evento *scroll*, *map* para enviar el evento a una función que en base a **scrollHeight**, **scrollTop** y **clientHeight**, calcula el porcentaje actual de scroll en la página y modifica el *style.width* con el porcentaje recibido.

# Operadores no tan comunes

* **take**: El take deja pasar el número de emisiones entre el parentesis ej: `take(2)` y después se completa automáticamente.
* **first**: Deja pasar la primera emisión y después se completa. Puede ser empleado con una condición: `first(val => val >= 3)` En este caso se completaria cuando la emisión fuera igual o superior a 3.
* **takeWhile**: Deja pasar los elementos mientras no se cumpla la condición establecida, cuando algun valor hace que se cumpla la condición, el observable se completa. `takeWhile(({ y }) => y <= 150, true)` - El segundo argumento es el *inclusive*, si se manda un true, emitiría el valor que hizo que se completara el observable.
* **takeUntil**: Sigue emitiendo los valores hasta que el observable pasado como argumento recibe su primer valor: 
```javascript
const timer$    = interval(1000);
const clickBtn$ = fromEvent(button,'click'); 
timer$.pipe(
    takeUntil(clickBtn$);
).subscribe(console.log)

// Tambien se puede usar en una sola línea de esta manera.
takeUntil(fromEvent(button,'click'));
```
* **skip**: Omite el numero de emisiones que se le han pasado como argumento. `skip(2)`. En este caso las 2 primeras emisiones del observable seran ignoradas, y empezara a emitir a partir del tercer valor.
* **distinct**: Omite una emisión repetida por un observable. Ej: `of(1,2,3,4,1,1,1,5,5)` - De forma normal se recibirían todos los números, pero usando el `distinct()` solo se recibirían `1,2,3,4,5`. Para usar el `distinct()` con propiedades de objetos se debe especificar la propiedad que quiero que sea "única": **`distinct(p => p.nombre)`**
* **distinctUntilChanged**: Omite una emisión si la anterior es exactamente igual a la actual. Ej: `of(1,1,3,3,2,2,4,4,5,3,1)` - De forma normal se recibirían todos los números, pero usando el `distinctUntilChanged()` solo se recibirían `1,3,2,4,5,3,1`. Para usar el `distinctUntilChanged()` con propiedades de objetos se debe especificar una función comparativa: **`distinctUntilChanged( (anterior, actual) => anterior.nombre === actual.nombre))`**
* **distinctUntilKeyChanged**: Escucha la *propiedad* de un objeto y omite la emisión si la anterior es exactamente igual a la actual `distinctUntilKeyChanged('nombre')`

# Operadores que funcionan con tiempo

* **delay**: Retrasa la emisión del observable por la cantidad de tiempo pasado como argumento, o hasta la fecha asignada. `delay(1000)`  -- `delay(Date)`
* **debounceTime**: Espera la cantidad pasada como argumento antes de emitir el último valor, si un nuevo valor es emitido antes de que haya transcurrido ese lapso de espera, este se reiniciaria volviendo a esperar el lapso asignado hasta que no haya mas emisiones en ese periodo de tiempo para poder emitir el valor.
* **throttleTime**: Emite el valor inmediatamente y espera la cantidad de tiempo asignada hasta volver a emitir el siguiente valor, si recibe algun valor durante ese "cooldown" serian ignorados, a menos que se especifique de la siguiente manera.
```javascript
throttleTime(1000,asyncScheduler, {
    leading: true, // Emite el primer valor
    trailing: true // Emite el último valor
}),
```
* **sampleTime**: Nos permite obtener el último valor emitido dentro de un intervalo de tiempo. Es decir, si especificamos un `sampleTime(1000)` si el observable en ese lapso de 1 segundo emitiese 5 valores, al finalizar ese segundo, emitirá el último valor dentro de ese lapso.
* **sample**: Nos permite obtener una "muestra" de la última emisión de un observable al recibir un valor de *otro **observable***:
```javascript
// Cada vez que hicieramos click en el documento, recibiriamos la última emisión del observable.
const interval$ = interval(500);
const click$    = fromEvent(document,'click');

interval$.pipe(
    sample(click$)
).subscribe(console.log);
```
* **auditTime**: Espera la cantidad pasada como argumento antes de emitir el último valor. A diferencia del **`debounceTime()`** este no se reinicia al recibir un nuevo valor, simplemente emitira el último valor al finalizar la cantidad de tiempo asignada. Muy parecido a `sampleTime()`. La única diferencia con `sampleTime()`que tiene es que si el observable se completa antes, no se emitiría ningun último valor.

# AJAX

* **ajax**: Peticiones AJAX en RxJS `import { ajax } from 'rxjs/ajax';`
```javascript
ajax(url);
// Same as 
ajax.get(url);

// Headers
ajax(url, {
    'token': 'auth123'
});
```
* **getJSON**: Devuelve el body de la petición en formato JSON directamente, sin tener que pasarlo por el **map** o el **pluck**: `ajax.getJSON(url);` 
* **catchError**: Un catchError debe retornar siempre un observable, se puede conseguir mediante un `return of(false)`, `of([])`, `of({})`... etc   
* **AjaxError**: Tipado para el error de una petición *AJAX*
* **CRUD**: POST, PUT and DELETE. (Una petición DELETE devolvería un error en caso de incluirse el body tal y como está en el ejemplo)
```javascript
ajax.post(url, {
    id: 1,
    nombre: 'Alejandro'
}, {
    'mi-token': 'ABC123'
}).subscribe(console.log);
```
* **CRUD**: Método reutilizable: (En el caso que fuera una petición DELETE no devolvería error, se ejecutaría correctamente)
```javascript
ajax({
    url,
    method: 'DELETE',
    headers: {
        'mi-token': 'ABC123'
    },
    body: {
        id: 1,
        nombre: 'Alejandro'
    }
}).subscribe(console.log);
```

# Operadores de transformación o aplanamiento (Flattening Operators)

Los operadores de transformación o aplanamiento reciben un observable y se suscriben a este de manera interna.
Este tipo de operadores son necesarios cuando tenemos un observable dentro de otro observable, el cual necesitariamos suscribirnos dentro de la suscripción para poder recibir los valores, dicho proceso seria un poco dificil de leer y de mantener.

* **mergeAll**: Este operador se suscribe a los observables emitidos por el source, y esta pendiente de ellos, nos devolveria las emisiones de todas las suscripciones internas en un única suscripción. No se completaria hasta que todas las suscripciones a las que esta suscrito se completen. Puede recibir un argumento que es el número de observables internos a los que se suscribira, por defecto es ***Infinito***. `mergeAll()`
* **mergeMap**: Se llama con un *callBack*: `mergeMap( () => )`. Este operador funciona de igual manera que el **mergeAll**, la diferencia es que este puede ***transformar*** los valores de las suscripciones internas, al igual que *switchMap*, *concatMap* y *exhaustMap* 
```javascript
mergeMap(x => x * 5)
--------
mergeMap(() => interval(1000))
```
* **switchMap**: Se llama con un *callBack*: `switchMap( () => )`. Es igual que el *mergeMap*, con la única diferencia que mientras que el *mergeMap* puede mantener infinitas suscripciones internas, el **switchMap** solamente estará suscrito al más reciente. Es decir si tenemos una suscripción interna a un *interval* y nos entra otro valor del source, ese intervalo se completaria y pasaría a emitir los valores del último *interval*. Muy útil para las peticiones *AJAX*.
* **concatMap**: Se llama con un *callBack*: `concatMap( () => )`. Los observables a los que se suscribe internamente pasan inmediatamente a la salida, pero si entra un nuevo observable al que debe suscribirse, este lo pondria en la **cola** hasta que el observable al que está suscrito se completase, en ese momento se suscribiria y empezaria a emitir esos valores.
* **exhaustMap**: Se llama con un *callBack*: `exhaustMap( () => )`. A diferencia del *concatMap*, si este recibe un nuevo observable al que suscribirse y ya tiene activa una suscripción lo va a ***ignorar*** completamente, para que este operador se suscriba internamente a otro observable, no tiene que tener ninguno activo en ese preciso momento.

# Operadores y métodos de combinación

* **startWith**(Operador): Nos permite hacer una emisión o emisiones del argumento o argumentos pasado antes de que el observable EMPIECE a emitir. Pueden ser *strings*, *numeros*, *arrays*, *otro observable* etc.. Muy útil para cargar un loading mientras se efectua una petición HTTP `startWith('a','b','c')`
* **endWith**(Operador): Nos permite hacer una emisión o emisiones del argumento o argumentos pasado antes de que el observable se COMPLETE. Pueden ser *strings*, *numeros*, *arrays*, *otro observable* etc.. `endWith('a')`
* **concat**(Método): Método que nos permite encadenar observables, puede recibir tantos observables como queramos, hasta que el primer observable no se complete, no se ejecutaria el segundo. *concat* puede recibir también un array en lugar de un observable: `concat(of(1,2,3,4), of(1,2), [1,2,3])`
* **zip**: Combina multiples observables y retorna un observable cuyos valores son los valores en orden de los observables pasados como argumento. `zip(of(1),of(2))` devolveria un array de: [1, 2]
* **merge**(Método): Este método recibe uno o más observables y la salida va a ser el resultado de ambos observables combinados. 
```javascript
merge(
    keyup$.pipe(map(e => e.type)), 
    click$.pipe(map(e => e.type))
).subscribe(console.log);
```
* **combineLatest**(Método): Es un método con que nos permite mandar observables como argumentos(Deben de ser mandados como un *array*), combinarlos y emitir los valores de todos los observables internos simultáneamente. Este regresa un nuevo observable, el cual va a emitir valores hasta que todos los observables internos hayan emitido por lo menos un valor. Se deben completar todos los observables internos antes de que se complete el *combineLatest*.
```javascript
// Hasta pasados 2 segundos, no comenzaria a emitir nada y empezaria emitiendo un array de [1, 0] .. 1 
// Porque el primer observable ya era su segundo valor, y 0 por que el segundo intervalo acaba de comenzar a emitir.
combineLatest([
    interval(1000),
    interval(2000) // Si este segundo intervalo se completase, el valor emitido por el primer intervalo seguiria 
                   // siendo combinado con la última emisión de este intervalo: [2, 5], [3, 5], [4, 5] ...
]).subscribe(console.log)
```
* **forkJoin**(Método): Recibe varios observables como argumentos(Deben de ser mandados como un *array* o un *objeto*). Estos observables deben de ser **FINITOS**, es decir, deben de completarse en algún momento, si no el *forkJoin* no emitiría ningún valor. Una vez completados todos los observables, retornaria el último valor de todos los observables como un *array* u *objeto*. Si uno de los observables da un error, todo el *forkJoin* fallaria, habria que pasar individualmente el observable con error por un *pipe* y un *catchError* para poder recibir los valores de los observables que no estan fallando.
```javascript
const numeros$   = of(1,2,3,4);
const intervalo$ = interval(1000).pipe(take(3));
const letras$    = of('a','b','c').pipe(delay(3500));

forkJoin([
    numeros$,   // 4
    intervalo$, // 2
    letras$     // c
]).subscribe(console.log); // [4, 2, c]

forkJoin({
    num: numeros$,   // 4
    int: intervalo$, // 2
    let: letras$     // c
}).subscribe(console.log); // {num: 4, int: 2, let: c}

// La manera más usada del forkJoin es con peticiones AJAX
forkJoin({
    usuario: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
    repos: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/repo123123s`).pipe(catchError(err => of([]))),
    gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`),
}).subscribe(console.log);
```
