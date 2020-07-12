let dfs = (() => {
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


    let search = async (directions, currentIndex, endIndex, path, containerWidth, included) => {
        for(let i = 0; i < directions.length; i += 1) {
            let nextIndex = currentIndex + directions[i];
            if(inRange(currentIndex, nextIndex, containerWidth) && !included.has(nextIndex)) {
                path.push(nextIndex);
                if(nextIndex === endIndex) {
                    return true;
                }
                included.add(nextIndex);
                await delay();
                squares[nextIndex].dataset.colorType = 3;
                if(await search(directions, nextIndex, endIndex, path, containerWidth, included)) return true;
                path.pop(nextIndex);
            }
        }
        return false;
    };

    let drawPath = async path => {
        for(let i = 1; i < path.length - 1; i += 1) {
            await delay();
            squares[path[i]].dataset.colorType = 4;
        }
    };

    let start = async (s, e) => {
        let containerWidth = parseInt(container.clientWidth) / config.squareSize;
        let startIndex = getSquareIndex(s);
        let endIndex = getSquareIndex(e),
            directions = [-containerWidth, 1, containerWidth, -1],
            path = [startIndex];
        await search(directions, startIndex, endIndex, path, containerWidth, new Set([startIndex]));
        drawPath(path);
    };
    
    return {
        start
    };
})();