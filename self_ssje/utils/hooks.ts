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
function readonly<T extends object>(obj: T) {} //为了不报错，暂时定义一个readonly
function computed<T>(getter: () => T): { value: T } {
  return { value: getter() }; //简单实现computed
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
type DialogState = { title: string; visible: boolean };
export function useDialog() {
  const dialog = ref<DialogState>({ title: '', visible: false });
  function openDialog(title: string) {
    dialog.value = { title, visible: true };
  }
  function closeDialog() {
    dialog.value.visible = false;
  }
  return [readonly(dialog), openDialog, closeDialog] as const;
}

//loading相关hook
type LoadingState = { title: string; visible: boolean; colorBg: string };
type InitValue = Partial<LoadingState>;
const defaultLoadingData = { title: '加载中...', visible: false, colorBg: 'rgba(0,0,0,0.2)' };
export function useLoading(initValue: InitValue = defaultLoadingData) {
  let title = initValue.title ?? defaultLoadingData.title;
  let visible = initValue.visible ?? defaultLoadingData.visible;
  let colorBg = initValue.colorBg ?? defaultLoadingData.colorBg;
  const isLoading = ref<LoadingState>({ title, visible, colorBg });
  function setLoading(state: boolean, newTitle: string = title) {
    isLoading.value.visible = state;
    if (state) isLoading.value.title = newTitle;
  }
  return [readonly(isLoading), setLoading] as const;
}

//分页线管hooks
type PaginationState = { page: number; pageSize: number; total: number };
type PaginationOption = { pageSizes?: number[]; layout?: string };
export function usePagination(initValue: PaginationState = { page: 1, pageSize: 10, total: 0 }, paginationOption?: PaginationOption) {
  const pagination = ref<PaginationState>({ ...initValue });
  const paginationProps = computed(() => ({
    currentPage: pagination.value.page,
    pageSize: pagination.value.pageSize,
    total: pagination.value.total,
    pageSizes: paginationOption?.pageSizes ?? [10, 20, 50, 100, 200, 500],
    layout: paginationOption?.layout ?? 'total, sizes, prev, pager, next',
  }));
  function setPagination(Value: Partial<PaginationState>) {
    const { page: newPage, pageSize: newPageSize, total: newTotal } = Value;
    const { page, pageSize, total } = pagination.value;
    pagination.value = { page: newPage ?? page, pageSize: newPageSize ?? pageSize, total: newTotal ?? total };
  }
  return [readonly(pagination), setPagination, readonly(paginationProps)] as const;
}

//获取静态资源：如图片，图标等。半静态资源路径
export function useGetAssets() {
  function getAssetsIcons(path: string) {
    //@ts-ignore
    return new URL(`../assets/icons/${path}.png`, import.meta.url).href;
  }
  function getAssetsImages(path: string) {
    //@ts-ignore
    return new URL(`../assets/images/${path}.png`, import.meta.url).href;
  }
  return { getAssetsIcons, getAssetsImages };
}
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
    (clearTimeout(timer), (timer = null));
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

//常规防抖函数
export function useDebounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: null | ReturnType<typeof setTimeout> = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

//多任务防抖函数
export const useDebounceOneInstance = (duration: number = 300) => {
  let timer: null | ReturnType<typeof setTimeout> = null;
  function useDebounce<T extends (...args: any[]) => any>(fn: T, delay?: number): (...args: Parameters<T>) => void {
    return function (this: any, ...args: Parameters<T>) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay ?? duration);
    };
  }
  function clearDebounce() {
    if (timer) clearTimeout(timer);
    timer = null;
  }
  return [useDebounce, clearDebounce] as const;
};
