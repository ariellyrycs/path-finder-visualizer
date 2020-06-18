
let Util = (() => {

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



    return {
        debounce
    };
})();