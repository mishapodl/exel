import { ExcelComponents } from '@core/ExcelComponents';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom';
import { isCell, shouldResize } from '@/components/table/table.functions';
import { createTable } from '@/components/table/table.tmplate';
import { resizeHandler } from '@/components/table/table.resize';

export class Table extends ExcelComponents {
   static className = 'excel__table';

   constructor($root) {
      super($root, {
         listeners: ['mousedown']
      });
   }
   prepare() {
      this.selection = new TableSelection();
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
      } else if (isCell(event)) {
         this.select(event);
      }
   }

   select(event) {
      const $target = $(event.target);

      if (!event.ctrlKey) {
         this.selection.select($target);
      } else {
         this.selection.selectGroup($target);
      }
   }
}
