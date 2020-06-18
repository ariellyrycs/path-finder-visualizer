let algoElem = document.querySelector('#algos'),
    squares = document.querySelector('.squares'),
    containerElem = document.querySelector('.container'),
    currentState = algoElem.value,
    squareSize = 30;

let render = () => {
    let containerRect = containerElem.getBoundingClientRect();
    let squareWidth = Math.floor((containerRect.width - 2) / squareSize),
        squareHeight = Math.floor((containerRect.height - 2) / squareSize);
    let str = '';
    for(let i = 0; i < squareWidth; i += 1) {
        for(let j = 0; j < squareHeight; j += 1) {
            str += `<div class=""></div>`;
        }
    }
    squares.innerHTML = str;
    squares.style.width = squareWidth * squareSize + 'px';
};

render();

algoElem.addEventListener('change', e => {
    currentState = e.target.value;
});

let debounceResize = Util.debounce(() => {
    render();
}, 350);
window.addEventListener('resize', () => {
    squares.innerHTML = '';
    debounceResize();
});