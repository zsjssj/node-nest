const eventNames = ['API:UN_AUTH', 'API:AUTH'] as const
type EventName = (typeof eventNames)[number]

class EventMap {
  private listeners: Record<EventName, Set<Function>> = eventNames.reduce(
    (acc, pre) => {
      acc[pre] = new Set()
      return acc
    },
    <Record<EventName, Set<Function>>>{},
  )
  on(eventName: EventName, listener: Function) {
    this.listeners[eventName].add(listener)
  }
  off(eventName: EventName, listener: Function) {
    this.listeners[eventName].delete(listener)
  }
  emit(eventName: EventName, ...args: any) {
    this.listeners[eventName].forEach(listener => listener(args))
  }
}

const aeventMap = new EventMap()

aeventMap.on('API:UN_AUTH', (data: any) => {
  console.log('eventBus_data1', data)
})
aeventMap.on('API:UN_AUTH', (data: any) => {
  console.log('eventBus_data2', data)
})
aeventMap.on('API:UN_AUTH', (data: any) => {
  console.log('eventBus_data3', data)
})
aeventMap.emit('API:UN_AUTH', [1, 2, 3, 4, 5])

export default new EventMap()
