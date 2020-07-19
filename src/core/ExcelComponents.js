import { DomListener } from '@core/DomListener';

export class ExcelComponents extends DomListener {
   constructor($root, options = {}, test) {
      super($root, options.listeners);
   }
   toHTML() {
      return '';
   }

   init() {
      this.initDOMListeners();
   }
}
