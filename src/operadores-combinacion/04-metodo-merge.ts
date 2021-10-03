import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

const keyup$ = fromEvent(document,'keyup');
const click$ = fromEvent(document,'click');

merge(
    keyup$.pipe(map(e => e.type)), 
    click$.pipe(map(e => e.type))
).subscribe(console.log)