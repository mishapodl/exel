import { DomListener } from '@core/DomListener';

export class ExcelComponents extends DomListener {
   constructor($root, options = {}) {
      super($root, options.listeners);
      this.name = options.name || '';
      this.emitter = options.emitter;
      this.unsubscribers = [];
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

   init() {
      this.initDOMListeners();
   }

   destroy() {
      this.removeDOMListeners();
      this.unsubscribers.forEach(unsub => unsub());
   }
}
