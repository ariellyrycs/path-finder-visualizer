


let matrixOptions = (() => {
    let squares = document.querySelector('.squares'),
        containerElem = document.querySelector('.container'),
        squareSize = config.squareSize;

    let matrixOptions = {
        matrix: null,
        matrixContainer: containerElem
    };

    let generateMatrix = () => {
        let cells = squares.querySelectorAll('div');
        let containerWidth = Math.floor(parseInt(containerElem.clientWidth) / config.squareSize);
        let matrix = [];
        let j = 0,
            i = 0;
        while(i < cells.length) {
            matrix[j] = matrix[j] || [];
            matrix[j].push(cells[i]);
            i += 1;
            if(i % containerWidth === 0) {
                j += 1;
            }
        }
        matrixOptions.matrix = matrix;
    };

    let render = () => {
        let containerRect = containerElem.getBoundingClientRect();
        let squareWidth = Math.floor((containerRect.width - 2) / squareSize),
            squareHeight = Math.floor((containerRect.height - 2) / squareSize);
        let str = '';
        
        for(let j = 0; j < squareHeight; j += 1) {
            for(let i = 0; i < squareWidth; i += 1) {
                str += `<div data-y="${j}" data-x="${i}"></div>`;
            }
        }
        squares.innerHTML = str;
        squares.style.width = squareWidth * squareSize + 'px';
        generateMatrix();
    };

    render();
    
    let debounceResize = Util.debounce(() => {
        render();
    }, 350);

    window.addEventListener('resize', () => {
        squares.innerHTML = '';
        debounceResize();
    });

    return matrixOptions;
})();