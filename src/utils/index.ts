export const saveInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
