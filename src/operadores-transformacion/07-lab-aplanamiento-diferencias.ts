import { fromEvent, of } from 'rxjs';
import { tap, map, mergeMap, switchMap, exhaustMap, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// Helper
const peticionHttpLogin = (userPass) => ajax.post('https://reqres.in/api/login?delay=1', userPass)
.pipe(
    map(res => res.response['token']),
    catchError(err => of(err.response.error))
)

// Creando un formulario
const form = document.createElement('form');
const inputEmail = document.createElement('input');
const inputPass  = document.createElement('input');
const submitBtn  = document.createElement('button');

// Configuraciones
inputEmail.type = 'email';
inputEmail.placeholder = 'Email';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'pass';
inputPass.placeholder = 'Password';
inputPass.value = 'cityslicka';

submitBtn.innerHTML = 'Submit';

form.append(inputEmail, inputPass, submitBtn);
document.body.append(form);

// Streams
const submitForm$ = fromEvent<Event>(form, 'submit').pipe(
    tap(ev => ev.preventDefault()),
    map(ev => ({
        email: ev.target[0].value,
        password: ev.target[1].value,
    })),
    // mergeMap(peticionHttpLogin)  // Ejecutaria todas las peticiones HTTP mientras siguiera haciendo submit
    // switchMap(peticionHttpLogin) // Cancelaria las peticiones anteriores si pulso de nuevo el submit
    exhaustMap(peticionHttpLogin)   // Ignoraria los demás intentos de submit si ya hay una petición HTTP en curso.
);

submitForm$.subscribe(token => {
    console.log(token);
});