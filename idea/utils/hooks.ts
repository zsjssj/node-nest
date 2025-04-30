//仿写vue3的ref
//代理,
function ref<T>(value: T) {
  return new Proxy(
    { value },
    {
      get(target, key, receiver) {
        return Reflect.get(target, key, receiver);
      },
      set(target, key, value: T, receiver) {
        Reflect.set(target, key, value, receiver);
        return true;
      },
    },
  );
}
//get、set
function ref2<T>(value: T) {
  const refObject = {
    get value() {
      console.log('get value', value);
      return value;
    },
    set value(newValue: T) {
      console.log('set value', newValue);
      value = newValue;
    },
  };
  return refObject;
}

function reactive<T extends Array<any> | object>(obj: T) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      target[key] = value;
      Reflect.set(target, key, value, receiver);
      return true;
    },
  });
}

function useLoading(data: string) {
  const loading = ref<boolean>(false);
  const loadTitle = ref<string>('');
  loadTitle.value = data || '加载中...';
  const setLoading = (value1: string | boolean) => {
    if (typeof value1 === 'string') {
      loadTitle.value = value1;
      loading.value = true;
    } else if (typeof value1 === 'boolean') {
      loading.value = value1;
    }
  };
  return [loading, loadTitle, setLoading] as const;
}
//1.
(() => {
  const [loading, loadTitle, setLoading] = useLoading('加载中...');
  console.log('loading', loading.value, loadTitle.value);
  setLoading('加载中1...');
  console.log('loading', loading.value, loadTitle.value);
})();

// import { ComponentInternalInstance, getCurrentInstance } from 'vue'
interface ComponentInternalInstance {
  appContext: any;
}
function getCurrentInstance(): ComponentInternalInstance {
  return { appContext: '' };
}
//获取当前实例
export function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  return {
    proxy,
  };
}
