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

//弹窗相关hook
export const useDialog = () => {
  const dialog = ref<{ title: string; visible: boolean }>({ title: '', visible: false });
  function openDialog(title: string) {
    dialog.value.title = title;
    dialog.value.visible = true;
  }
  function closeDialog(resetTitle = false) {
    dialog.value.visible = false;
    if (resetTitle) dialog.value.title = '';
  }
  return { dialog, openDialog, closeDialog };
};

//loading相关hook
export function useLoading(title = '加载中...', initialValue = false) {
  const isLoading = ref<{ title: string; visible: boolean }>({ title: title, visible: initialValue });
  function setLoading(state: boolean, title1: string = title) {
    isLoading.value.visible = state;
    if (state) isLoading.value.title = title1;
  }
  return { isLoading, setLoading };
}

// import { getCurrentInstance, type ComponentInternalInstance } from 'vue';
// export function useCurrentInstance() {
//   const { appContext } = getCurrentInstance() as ComponentInternalInstance;
//   const proxy = appContext.config.globalProperties;
//   return {
//     proxy,
//   };
// }

// //获取静态资源：如图片，图标等。半静态资源路径
// export function useStaticAssets() {
//   function getAssetsIcons(path: string) {
//     return new URL(`../../assets/icons/${path}.png`, import.meta.url).href;
//   }
//   function getAssetsImages(path: string) {
//     return new URL(`../../assets/images/${path}.png`, import.meta.url).href;
//   }
//   return { getAssetsIcons, getAssetsImages };
// }
type Func = (...arg: any[]) => void;
type params = { url: string; onopenEvent: Func; onmessageEvent: Func; onerrorEvent?: Func; oncloseEvent?: () => void };
export function useWebsocket({ url, onopenEvent, onmessageEvent, onerrorEvent, oncloseEvent }: params): WebSocket {
  if (typeof WebSocket === 'undefined') throw new Error('您的浏览器不支持WebSocket');
  const ws = new WebSocket(url);
  let timer: NodeJS.Timeout | null = null;

  function heartbeat() {
    if (timer) clearTimeout(timer);
    if (ws.readyState === WebSocket.OPEN) ws.send('ping');
    timer = setTimeout(() => {
      heartbeat();
    }, 30000);
  }

  function clearTimeoutHandle() {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
  }

  ws.onopen = () => {
    onopenEvent();
    heartbeat();
  };

  ws.onmessage = (_event) => {
    onmessageEvent(_event);
  };

  ws.onerror = (_error) => {
    if (onerrorEvent) onerrorEvent(_error);
  };

  ws.onclose = () => {
    clearTimeoutHandle();
    if (oncloseEvent) oncloseEvent();
  };

  return ws;
}
