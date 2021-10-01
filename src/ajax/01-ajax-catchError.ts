import { ajax, AjaxError } from 'rxjs/ajax'
import { map, pluck, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const url = 'https://api.github.com/users?per_page=5';


const atrapaError = (err: AjaxError) => {
    console.warn('error en:', err)
    return of(null)
}

ajax(url).pipe(
    map( resp => resp.response),
    catchError(atrapaError)
).subscribe(users => console.log('usuarios:', users));
        
// const manejaErrores = (res: Response) => {
//     if (!res.ok){
//         throw new Error(res.statusText);
//     } else {
//         return res;
//     }
// }
// const fetchPromesa = fetch(url);

// fetchPromesa.then( async(resp) => {
//     if (!resp.ok) throw new Error(resp.statusText)

//     const data = await resp.json();
//     console.log(data)
// }).catch( err => console.warn('fuckedup',err) )


// fetchPromesa
//     .then(manejaErrores)
//     .then(resp => resp.json())
//     .then(data => console.log('data:',data))
//     .catch(err => console.warn('error en usuarios', err))

