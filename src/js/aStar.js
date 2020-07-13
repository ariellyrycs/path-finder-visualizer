let aStar = ((matrixOptions, {delay, geneareFourDirectionalCoordinates}) => {



    let calculateManhattanDistance = (s, e) => {
        return Math.abs(s[0] - e[0]) + Math.abs(s[1] - e[1]);
    };

    function MinTrackNode(startCoords, endCoords) {
        this.coords = startCoords;
        this.value = calculateManhattanDistance(startCoords, endCoords);
    }

    let search = async (startCoords, endCoords, included, path) => {
        let minTrack = new ds.PriorityQueue((a, b) => a.value < b.value);
        minTrack.push(new MinTrackNode(startCoords, endCoords));

        while(minTrack.size()) {
            let currentCoords = minTrack.pop();
            path.push(currentCoords.coords);
            let possibleDirections = geneareFourDirectionalCoordinates(currentCoords.coords);
            for(let i = 0; i < possibleDirections.length; i += 1) {
                let nextCoords = possibleDirections[i];
                if(!included.has(nextCoords.toString())) {
                    if(nextCoords.toString() === endCoords.toString()) return true;
                    await delay();
                    matrixOptions.matrix[nextCoords[0]][nextCoords[1]].dataset.colorType = 3;
                    minTrack.push(new MinTrackNode(nextCoords, endCoords));
                    included.add(nextCoords.toString());
                }
            }
        }
    };

    let drawPath = async (path) => {
        for(let i = 1; i < path.length; i += 1) {
            await delay();
            let curr = path[i];
            matrixOptions.matrix[curr[0]][curr[1]].dataset.colorType = 4;
        }
    };

    let start = async (s, e, walls) => { 
        let path = [];
        await search(s, e, new Set([
            s.toString(),
            ...walls.map(i => i.toString())
        ]), path);
        await drawPath(path);
    };

    return {
        start
    };
})(matrixOptions, Util);