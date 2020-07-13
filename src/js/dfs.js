let dfs = ((matrixOptions, {delay, geneareFourDirectionalCoordinates}) => {

    let search = async (currentCoods, endCoords, path, included) => {
        let possibleDirections = geneareFourDirectionalCoordinates(currentCoods);
        for(let i = 0; i < possibleDirections.length; i += 1) {
            let nextCoords = possibleDirections[i];
            if(!included.has(nextCoords.toString())) {
                path.push(nextCoords);
                if(nextCoords.toString() === endCoords.toString()) return true;
                included.add(nextCoords.toString());
                await delay();
                matrixOptions.matrix[nextCoords[0]][nextCoords[1]].dataset.colorType = 3;
                if(await search(nextCoords, endCoords, path, included)) return true;
                path.pop();
            }
        }
        return false;
    };

    let drawPath = async path => {
        for(let i = 1; i < path.length - 1; i += 1) {
            await delay();
            let [y, x] = path[i];
            matrixOptions.matrix[y][x].dataset.colorType = 4;
        }
    };

    let start = async (start, end, walls) => {
        let path = [start];
        await search(start, end, path, new Set([
            start.toString(),
            ...walls.map(i => i.toString())
        ]));
        drawPath(path);
    };
    
    return {
        start
    };
})(matrixOptions, Util);