//https://stackoverflow.com/questions/64959908/svelte-component-onload
const createLoadObserver = handler => {
    let waiting = 0

    const onload = el => {
        waiting++
        el.addEventListener('load', () => {
            waiting--
            if (waiting === 0) {
                handler()
            }
        })
    }

    return onload
}

export {
    createLoadObserver
}