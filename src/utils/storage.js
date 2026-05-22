export const storage = {
  get: (key) => {
    const item = localStorage.getItem(`mrchills_${key}`)
    return item ? JSON.parse(item) : null
  },
  set: (key, value) => {
    localStorage.setItem(`mrchills_${key}`, JSON.stringify(value))
  },
  remove: (key) => {
    localStorage.removeItem(`mrchills_${key}`)
  }
}