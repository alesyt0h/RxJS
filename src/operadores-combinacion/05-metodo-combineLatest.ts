import { combineLatest, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

const input1 = document.createElement('input');
const input2 = document.createElement('input');

input1.placeholder = 'email@gmail.com';

input2.placeholder = '*******';
input2.type = 'password';

document.body.append(input1, input2);

// Helper
const getInputStream = (elem: HTMLElement) => {
    return fromEvent<KeyboardEvent>(elem, 'keyup').pipe(
        map(e => e.target['value'])
    );
}


combineLatest([
    getInputStream(input1),
    getInputStream(input2)
]).subscribe(console.log)