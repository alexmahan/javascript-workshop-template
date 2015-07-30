import mixin from 'app/util/mixin';
import { isArray } from 'underscore';

/**
 * Creates an instances eventable mixin.
 * @param {array<string>} types - The event types.
 * @return {function}
 */
export default function(...types) {
  let m = mixin({
    /**
     * The instanced lookup.
     * @return {Map}
     * @private
     */
    __getLookup() {
      if (!this.__lookup) {
        this.__lookup = types.reduce((sum, t) => {
          sum.set(t, new Set());
          return sum;
        }, new Map());
      }

      return this.__lookup;
    },

    /**
     * Cleanup.
     */
    tearDownEventable() {
      this.__lookup = null;
    },

    /**
     * Trigger an event.
     * @param {string} name - The event name.
     * @param {array=} data - The fn data.
     */
    trigger(name, ...data) {
      let handlers = this.__getLookup().get(name);

      handlers.forEach((fn) => {
        fn(...data);
      });
    },

    /**
     * Add a listener.
     * @param {string} name - The event name.
     * @param {function} fn - The callback function.
     * @param {boolean} triggerImmediately - If the fn should be called when added.
     */
    on(name, fn, triggerImmediately=false) {
      let handlers = this.__getLookup().get(name);

      if (!handlers) { return; }

      if (!fn) {
        throw new Error('Cannot attach an event with a function');
      }

      handlers.add(fn);

      if (!triggerImmediately) { return; }

      let args = [];

      if (typeof this.eventableState === 'function') {
        args = this.eventableState(name) || [];

        if (!isArray(args)) {
          args = [args];
        }
      }

      this.trigger(name, ...args);
    },

    /**
     * Remove a listener.
     * @param {string} name - The event name.
     * @param {function} fn - The callback function to remove.
     */
    off(name, fn) {
      let handlers = this.__getLookup().get(name);

      if (handlers) {
        handlers.delete(fn);
      }
    }
  });

  return function makeEventable(target) {
    m(target.prototype);
  };
}
