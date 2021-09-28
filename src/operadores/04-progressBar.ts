import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const texto = document.createElement('div');
texto.innerHTML = `
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!
<br/><br/>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!
<br/><br/>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!
<br/><br/>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!
<br/><br/>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!
<br/><br/>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maiores quas esse dicta, officia molestias in ipsa! Nihil, alias rerum excepturi cupiditate esse dolore vitae blanditiis provident facilis sed non!
`;

const body = document.body;
body.append(texto);

const progressBar = document.createElement('div');
// progressBar.setAttribute('class','progress-bar');
progressBar.classList.add('progress-bar');

body.append(progressBar);


// Funcion que haga el calculo
const calcularPorcentajeScroll = (event) => {
    // console.log(event.target.scrollingElement.scrollHeight);
    // console.log(event.target.documentElement.scrollHeight);

    const { clientHeight, scrollHeight, scrollTop, } = event.target.documentElement
    // console.log(clientHeight, scrollHeight, scrollTop)

    return ((scrollTop / (scrollHeight - clientHeight)) * 100)
}

// Streams

const scroll$ = fromEvent(document,'scroll');
// scroll$.subscribe(console.log)

const progress$ = scroll$.pipe(
    map( calcularPorcentajeScroll ),
    tap(console.log)
);


progress$.subscribe(porcentaje => {
    progressBar.style.width = `${porcentaje}%`;
});