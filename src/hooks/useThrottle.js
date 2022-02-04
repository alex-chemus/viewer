const useThrottle = (callback, delay) => {
  let isThrottle = false

  const throttleCallback = (...args) => {
    if (isThrottle) return
    callback(...args)
    isThrottle = true
    setTimeout(() => {
      isThrottle = false
    }, delay);
  }

  return throttleCallback
}

export default useThrottle