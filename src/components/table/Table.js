import { ExcelComponents } from '@core/ExcelComponents';
import { TableSelection } from './TableSelection';
import { isCell, nextSelector, shouldResize } from './table.functions';
import { createTable } from './table.tmplate';
import { resizeHandler } from './table.resize';
import { typeSelect, selectDefault } from './table.selection';
import { keys } from './constants';

export class Table extends ExcelComponents {
   static className = 'excel__table';

   constructor($root) {
      super($root, {
         listeners: ['mousedown', 'keydown']
      });
   }

   prepare() {
      this.selection = new TableSelection();
   }

   init() {
      super.init();
      selectDefault(this.$root, this.selection);
   }

   toHTML() {
      return createTable(20);
   }

   onMousedown(event) {
      if (shouldResize(event)) {
         resizeHandler(this.$root, event);
      } else if (isCell(event)) {
         typeSelect(this.$root, this.selection, event);
      }
   }

   onKeydown(event) {
      const { key, shiftKey } = event;
      if (keys.includes(key) && !shiftKey) {
         event.preventDefault();
         const id = this.selection.current.id(true);
         const $next = this.$root.find(nextSelector(key, id));
         this.selection.select($next);
      }
   }
}

