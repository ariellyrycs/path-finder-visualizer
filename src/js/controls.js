(() => {
    let navBar = document.querySelector('.nav-bar'),
        squares = document.querySelector('.squares'),
        reset = document.querySelector('#reset'),
        start = document.querySelector('#start'),
        algoElem = document.querySelector('#algos'),
        currentState = algoElem.value;

    let currentTypePointer = 0;
    let startElement = null;
    let endElement = null,
        wallCell = [];


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
            if(currentTypePointer === 2) {
                let {x, y} = e.target.dataset;
                wallCell.push([y, x]);
            }
        }
    });

    reset.addEventListener('click', () => {
        squares.querySelectorAll('[data-color-type]').forEach(div => {
            delete div.dataset.colorType;
        });
        startElement = null;
        endElement = null;
        wallCell = [];
    });

    start.addEventListener('click', () => {
        if(startElement === null || endElement === null) return;
        let sDataSet = startElement.dataset,
            eDataSet = endElement.dataset;
        let sX = +sDataSet.x;
        let sY = +sDataSet.y;
        let eX = +eDataSet.x;
        let eY = +eDataSet.y;
        switch(currentState) {
            case 'A':
                aStar.start([sY, sX], [eY, eX], wallCell);
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
                bfs.start([sY, sX], [eY, eX], wallCell);
                break;
            case 'Depth':
                dfs.start([sY, sX], [eY, eX], wallCell);
                break;
            default:
        }
    });
})();