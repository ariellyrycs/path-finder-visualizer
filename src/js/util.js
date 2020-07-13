
let Util = (() => {

    let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    let debounce = (cb, wait) => {
        let time;
        return () => {
            let self = this;
            clearTimeout(time);
            time = setTimeout(() => {
                cb.apply(self);
            }, wait);
        };
    };

    let delay = () => {
        return new Promise(res => setTimeout(res, config.delay));
    };

    let inRange = ([y, x]) => {
        return 0 <= y && y < matrixOptions.matrix.length && 0 <= x && x < matrixOptions.matrix[0].length;
    };

    let geneareFourDirectionalCoordinates = (coords) => {
        let possibleCoords = [];
        for(let i = 0; i < directions.length; i += 1) {
            let nextCoords = [coords[0] + directions[i][0], coords[1] + directions[i][1]];
            if(inRange(nextCoords)) possibleCoords.push(nextCoords);
        }
        return possibleCoords
    };
    
    return {
        debounce,
        delay,
        inRange,
        geneareFourDirectionalCoordinates
    };
})();