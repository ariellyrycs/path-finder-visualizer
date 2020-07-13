let aStar = (() => {

    let container = document.querySelector('.squares'),
    squares = Array.from(container.querySelectorAll('div'));


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

    let search = async (starIndex, endIndex, containerWidth) => {
        let minTrack = new ds.PriorityQueue((a, b) => a < b);
        minTrack.insert();
    };

    let start = async (a, e) => { 
        let startIndex = getSquareIndex(start);
        let containerWidth = parseInt(container.clientWidth) / config.squareSize;
        let endIndex = getSquareIndex(end);
        await search(starIndex, endIndex, containerWidth);
    };

    return {
        start
    };
})();