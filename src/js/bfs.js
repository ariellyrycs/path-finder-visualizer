let bfs = ((matrixOptions, {delay, geneareFourDirectionalCoordinates}) => {

    function LevelNode(coords, indexRoute) {
        this.coords = coords;
        this.route = indexRoute;
    }

    let search = async (startCoords, endCoords, included) => {
        let levels = [[new LevelNode(startCoords, '0')]],
            levelIndex = 0;
        while(levelIndex < levels.length) {
            let currentLevel = levels[levelIndex];
            let newLevel = [];
            for(let i = 0; i < currentLevel.length; i += 1) {
                let {coords, route} = currentLevel[i];
                let possibleCoords = geneareFourDirectionalCoordinates(coords);
                for(let d = 0; d < possibleCoords.length; d += 1) {
                    let nextCoords = possibleCoords[d];
                    if(!included.has(nextCoords.toString())) {
                        newLevel.push(new LevelNode(nextCoords, route + ',' + newLevel.length));
                        await delay();
                        if(nextCoords.toString() === endCoords.toString()) {
                            levels.push(newLevel)
                            return levels;
                        }
                        matrixOptions.matrix[nextCoords[0]][nextCoords[1]].dataset.colorType = 3;
                        included.add(nextCoords.toString());
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
            let [y, x] = levels[i][route[i]].coords;
            matrixOptions.matrix[y][x].dataset.colorType = 4;
        }
    };

    let start = async (start, end, walls) => {
        let levels = await search(start, end, new Set([
            start.toString(),
            ...walls.map(i => i.toString())
        ]));
        await drawPath(levels);
    };

    return {
        start
    };
})(matrixOptions, Util);