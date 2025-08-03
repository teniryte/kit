type EventMap = Record<string, any[]>;

export class EventEmitter<Events extends EventMap> {
  private listeners: {
    [K in keyof Events]?: Array<(...args: Events[K]) => void>;
  } = {};

  on<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => void
  ): this {
    (this.listeners[event] ??= []).push(listener);
    return this;
  }

  once<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => void
  ): this {
    const onceWrapper = (...args: Events[K]) => {
      this.off(event, onceWrapper);
      listener(...args);
    };
    return this.on(event, onceWrapper);
  }

  off<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => void
  ): this {
    this.listeners[event] = (this.listeners[event] ?? []).filter(
      (l) => l !== listener
    );
    return this;
  }

  emit<K extends keyof Events>(event: K, ...args: Events[K]): boolean {
    const ls = this.listeners[event];
    if (!ls || ls.length === 0) return false;
    ls.forEach((listener) => listener(...args));
    return true;
  }

  removeAllListeners<K extends keyof Events>(event?: K): this {
    if (event) {
      delete this.listeners[event];
    } else {
      this.listeners = {};
    }
    return this;
  }
}

export default EventEmitter;
