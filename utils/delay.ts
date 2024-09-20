export const delay = (seconds = 0.2) => {
  return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000)
  })
}
