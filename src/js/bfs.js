

let bfs = (() => {
    let container = document.querySelector('.squares'),
        squares = Array.from(container.querySelectorAll('div'));

    function Node(index, indexRoute) {
        this.index = index;
        this.route = indexRoute;
    }

    let getSquareIndex = (elem) => {
        return squares.indexOf(elem);
    };

    let inRange = (currentIndex, nextIndex, containerWidth) => {
        if(Math.floor(nextIndex / containerWidth) !== Math.floor(currentIndex / containerWidth) &&
            Math.abs(nextIndex - currentIndex) === 1) {
            return false;
        }
        return 0 <= nextIndex && nextIndex < squares.length;
    };

    let delay = () => {
        return new Promise(res => setTimeout(res, 10));
    };

    let search = async (directions, startIndex, endIndex, containerWidth) => {
        let levels = [[new Node(startIndex, '0')]],
            included = new Set([startIndex]),
            levelIndex = 0;
        while(levelIndex < levels.length) {
            let currentLevel = levels[levelIndex];
            let newLevel = [];
            for(let i = 0; i < currentLevel.length; i += 1) {
                let {index, route} = currentLevel[i];
                for(let directionIndex = 0; directionIndex < directions.length; directionIndex += 1) {
                    let nextIndex = index + directions[directionIndex];
                    if(inRange(index, nextIndex, containerWidth) && !included.has(nextIndex)) {
                        newLevel.push(new Node(nextIndex, route + ',' + newLevel.length));
                        await delay();
                        if(nextIndex === endIndex) {
                            levels.push(newLevel)
                            return levels;
                        }
                        squares[nextIndex].dataset.colorType = 3;
                        included.add(nextIndex);
                    }
                }
            }
            if(newLevel.length) levels.push(newLevel);
            levelIndex += 1;
        }
        return [];
    };

    let drawPath = async (levels) => {
        if(levels.length === 0) return;
        let lastLevel = levels[levels.length - 1];
        let route = lastLevel[lastLevel.length - 1].route.split(',');
        for(let i = 1; i < route.length - 1; i += 1) {
            await delay();
            squares[levels[i][route[i]].index].dataset.colorType = 4;
        }
    };

    let start = async (start, end) => {
        let startIndex = getSquareIndex(start);
        let containerWidth = parseInt(container.clientWidth) / config.squareSize;
        let endIndex = getSquareIndex(end),
            directions = [-containerWidth, 1, containerWidth, -1];
            
        let levels = await search(directions, startIndex, endIndex, containerWidth);
        drawPath(levels);
    };

    return {
        start
    };
})();