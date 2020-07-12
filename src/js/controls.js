(() => {
    let navBar = document.querySelector('.nav-bar'),
        squares = document.querySelector('.squares'),
        reset = document.querySelector('#reset'),
        start = document.querySelector('#start'),
        algoElem = document.querySelector('#algos'),
        currentState = algoElem.value;

    let currentTypePointer = 0;
    let startElement = null;
    let endElement = null;


    algoElem.addEventListener('change', e => {
        currentState = e.target.value;
    });

    navBar.addEventListener('click', ({target}) => {
        if(typeof target.dataset.pointerType !== 'undefined') {
            currentTypePointer = parseInt(target.dataset.pointerType);
        }
    });


    squares.addEventListener('mouseup', (e) => {
        if(typeof e.target.dataset.colorType === 'undefined' && currentTypePointer !== 3) {
            if(currentTypePointer === 0) {
                if(startElement) delete startElement.dataset.colorType;
                startElement = e.target;
            } else if(currentTypePointer === 1) {
                if(endElement) delete endElement.dataset.colorType;
                endElement = e.target;
            }
            e.target.dataset.colorType = currentTypePointer;
        }
    });

    reset.addEventListener('click', () => {
        squares.querySelectorAll('[data-color-type]').forEach(div => {
            delete div.dataset.colorType;
        });
        startElement = null;
        endElement = null;
    });

    start.addEventListener('click', () => {
        if(startElement === null || endElement === null) return;
        switch(currentState) {
            case 'A':
            break;
            case 'Gready':
            break;
            case 'Swarn':
            break;
            case 'Convergent':
            break;
            case 'Bidirectional':
            break;
            case 'Breadth':
                bfs.start(startElement, endElement);
            break;
            case 'Depth':
            break;
            default:
        }
    });

    
    








})();