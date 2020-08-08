import { ExcelComponents } from '@core/ExcelComponents';
import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/dom';

export class Toolbar extends ExcelComponents {
   static className = 'excel__toolbar';

   constructor($root, options) {
      super($root, {
         name: 'Toolbar',
         listeners: ['click'],
         ...options
      });
   }

   toHTML() {
      return createToolbar();
   }

   onClick(event) {
      console.log($(event.target).data);
   }
}
