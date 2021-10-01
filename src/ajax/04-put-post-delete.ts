import { ajax } from 'rxjs/ajax';

const url = 'https://httpbin.org/delay/1';

ajax.get(url, {
    'token': 'auth1234'
}).subscribe(console.log);

ajax.post(url, {
    id: 1,
    nombre: 'Alejandro'
}, {
    'mi-token': 'ABC123'
}).subscribe(console.log);

ajax.put(url, {
    id: 1,
    nombre: 'Alejandro'
}, {
    'mi-token': 'ABC123'
}).subscribe(console.log);

ajax.delete(url, {
    'mi-token': 'ABC123'
}).subscribe(console.log);

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
