import { fromEvent, debounceTime, Observable } from 'rxjs';
import { map, mergeAll, mergeMap, pluck, switchMap } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

import { GithubUser, GithubUsersResp } from '../interfaces/github-users.interface';

// Referencias
const body = document.body;
const textInput = document.createElement('input');
const orderList = document.createElement('ol');
body.append(textInput, orderList);

// Helpers
const mostrarUsuarios = (usuarios: GithubUser[]) => {

    console.log(usuarios);
    orderList.innerHTML = '';

    for(const usuario of usuarios){
        const li  = document.createElement('li');
        const img = document.createElement('img');
        img.src   = usuario.avatar_url;

        const anchor  = document.createElement('a');
        anchor.href   = usuario.html_url;
        anchor.text   = 'Ver página';
        anchor.target = '_blank';

        li.append(img);
        li.append(usuario.login + ' ');
        li.append(anchor);

        orderList.append(li);
    }
}

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput,'keyup');

input$.pipe(
    debounceTime(500),
    mergeMap<KeyboardEvent, Observable<GithubUsersResp>>(event => {
        const texto = event.target['value'];
        return ajax.getJSON(`https://api.github.com/search/users?q=${texto}`);
    }),
    map<GithubUsersResp, GithubUser[]>(v => v.items)
)//.subscribe( mostrarUsuarios); // console.log(users[0].url);

const url = 'https://httpbin.org/delay/0?arg=';

input$.pipe(
    pluck('target','value'),
    switchMap( texto => ajax.getJSON(url + texto))
).subscribe(console.log);