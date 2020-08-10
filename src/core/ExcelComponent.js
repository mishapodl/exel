import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
   constructor($root, options = {}) {
      super($root, options.listeners);
      this.name = options.name || '';
      this.emitter = options.emitter;
      this.subscribe = options.subscribe || [];
      this.unsubscribers = [];
      this.store = options.store;

      this.prepare();
   }

   prepare() {
   }

   toHTML() {
      return '';
   }

   $emit(event, ...args) {
      const unsub = this.emitter.emit(event, ...args);
      this.unsubscribers.push(unsub);
   }

   $on(event, fn) {
      this.emitter.subscribe(event, fn);
   }

   $dispatch(action) {
      this.store.dispatch(action);
   }

   storeChanged() {}

   isWatching(key) {
      return this.subscribe.includes(key);
   }

   $state() {
      return this.store.getState();
   }

   init() {
      this.initDOMListeners();
   }

   destroy() {
      this.removeDOMListeners();
      this.unsubscribers.forEach(unsub => unsub());
   }
}