import { DomListener } from '@core/DomListener';

export class ExcelComponents extends DomListener {
   constructor($root, options = {}) {
      super($root, options.listeners);
      this.name = options.name || '';
   }
   toHTML() {
      return '';
   }

   init() {
      this.initDOMListeners();
   }
}
