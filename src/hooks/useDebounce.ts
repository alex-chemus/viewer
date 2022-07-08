const useDebounce = (callback, delay) => {
  let timer = setTimeout(() => {});

  const debounceCallback = (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debounceCallback
}

export default useDebounce