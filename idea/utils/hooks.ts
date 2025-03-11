//仿写vue3的ref
function ref<T>(value: T) {
  const obj = { value }
  return new Proxy(obj, {
    get(target, key) {
      return <T>target[key]
    },
    set(target, key, value: T) {
      console.log('set', key, value)
      target[key] = value
      return true
    },
  })
}

function reactive<T extends Array<any> | object>(obj: T) {
  return new Proxy(obj, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      console.log('set', key, value)
      target[key] = value
      return true
    },
  })
}

function useLoading(data: string) {
  const loading = ref<boolean>(false)
  const loadTitle = ref<string>('')
  loadTitle.value = data || '加载中...'
  const setLoading = (value1: string | boolean) => {
    if (typeof value1 === 'string') {
      loadTitle.value = value1
      loading.value = true
    } else if (typeof value1 === 'boolean') {
      loading.value = value1
    }
  }
  return { loading, loadTitle, setLoading }
}
//1.
;() => {
  const { loading, loadTitle, setLoading } = useLoading('加载中...')
  console.log('loading', loading.value, loadTitle.value)
  setLoading('加载中1...')
  console.log('loading', loading.value, loadTitle.value)
}
