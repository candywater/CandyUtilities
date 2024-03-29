export const btoa = (text) => Buffer.from(text, 'binary').toString('base64');
export const atob = (base64) => Buffer.from(base64, 'base64').toString('binary');

//https://stackoverflow.com/questions/64959908/svelte-component-onload
export const createLoadObserver = handler => {
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
  