import { ExcelComponents } from '@core/ExcelComponents';
import { createTable } from '@/components/table/table.tmplate';
import { shouldResize } from '@/components/table/table.functions';
import { resizeHandler } from '@/components/table/table.resize';

export class Table extends ExcelComponents {
   static className = 'excel__table';

   constructor($root) {
      super($root, {
         listeners: ['mousedown']
      });
   }

   toHTML() {
      return createTable(20);
   }

   onMousedown(event) {
      if (shouldResize(event)) {
         resizeHandler(this.$root, event);
      }
   }
}
