const useDebounce = (callback: any, delay: any) => {
  /* eslint-disable */
  let timer = setTimeout(() => {});
  /* eslint-enable */

  const debounceCallback = (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debounceCallback
}

export default useDebounce
