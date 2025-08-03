import { EventEmitter } from '../runtime/event-emitter';

describe('event-emitter', () => {
  it('should emit events', () => {
    const emitter = new EventEmitter();
    const handler = vi.fn();

    emitter.on('test', handler);
    emitter.emit('test', 'test');

    expect(handler).toHaveBeenCalledWith('test');
  });

  it('should not call handlers after removeAllListeners', () => {
    const emitter = new EventEmitter();
    const handler = vi.fn();

    emitter.on('test', handler);
    emitter.removeAllListeners('test');
    emitter.emit('test', 'test');

    expect(handler).not.toHaveBeenCalled();
  });
});
