import { ExcelComponents } from '@core/ExcelComponents';
import { createTable } from '@/components/table/table.tmplate';
import { shouldResize } from '@/components/table/table.functions';
import { resizeHandler } from '@/components/table/table.resize';
import { TableSelection } from '@/components/table/TableSelection';

export class Table extends ExcelComponents {
   static className = 'excel__table';

   constructor($root) {
      super($root, {
         listeners: ['mousedown']
      });
   }

   prepare() {
      this.selection = new TableSelection(this.$root);
   }

   init() {
      super.init();

      this.selection.select(this.$root.find('[data-id="0:0"]'));
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
