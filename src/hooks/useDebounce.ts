const useDebounce = (callback: any, delay: any) => {
  let timer = setTimeout(() => {});

  const debounceCallback = (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debounceCallback
}

export default useDebounce