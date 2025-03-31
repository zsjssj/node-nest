;(() => {
  function handleObject<T extends Object>(obj: T, key: keyof T) {
    console.log(obj[key])
  }
  const obj = { name: 'a', age: 1 }
  handleObject(obj, 'name')
})()
