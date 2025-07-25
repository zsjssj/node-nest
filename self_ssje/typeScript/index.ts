const eventNames = ['API:ERROR_401', 'API:ERROR_403', 'API:ERROR_500', 'ROUTER:PUSH', 'UPDATE_TOWER'] as const;
type EventName = (typeof eventNames)[number];
type EventMapType = {
  'API:ERROR_401': [string, number];
  'API:ERROR_403': [boolean];
  'API:ERROR_500': [];
  'ROUTER:PUSH': [string, string];
  UPDATE_TOWER: [number, string];
};

type Func = (..._arg: any[]) => any;
class EventMap {
  private listeners: Record<EventName, Set<Func>> = eventNames.reduce(
    (acc, pre) => {
      acc[pre] = new Set();
      return acc;
    },
    <Record<EventName, Set<Func>>>{},
  );
  on<K extends keyof EventMapType>(eventName: K, listener: (..._arg: EventMapType[K]) => any): () => void {
    this.listeners[eventName].add(listener);
    return () => {
      this.listeners[eventName].delete(listener);
    };
  }
  off<T extends Func>(eventName: EventName, listener: T) {
    this.listeners[eventName].delete(listener);
  }
  emit<K extends keyof EventMapType>(eventName: K, ...args: EventMapType[K]) {
    this.listeners[eventName].forEach((listener) => listener(...args));
  }
}

const eventMap = new EventMap();
eventMap.on('API:ERROR_401', (args, index) => {
  console.log(args, index);
});
eventMap.emit('API:ERROR_401', '401错误发生了', 1);

export default new EventMap();
