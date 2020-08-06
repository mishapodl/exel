import { ExcelComponents } from '@core/ExcelComponents';
import { TableSelection } from './TableSelection';
import { isCell, nextSelector, shouldResize } from './table.functions';
import { createTable } from './table.tmplate';
import { resizeHandler } from './table.resize';
import { typeSelect } from './table.selection';
import { keys } from './constants';
import { $ } from '@core/dom';
import * as actions from '@/redux/actions';

export class Table extends ExcelComponents {
   static className = 'excel__table';

   constructor($root, options) {
      super($root, {
         name: 'Table',
         listeners: ['mousedown', 'keydown', 'input'],
         ...options
      });
   }

   prepare() {
      this.selection = new TableSelection();
   }

   init() {
      super.init();
      const $cell = this.$root.find('[data-id="0:0"]');

      this.selectCell($cell);

      this.$on('formula:input', text => {
         this.selection.current.text(text);
      });
      this.$on('formula:focusCell', () => {
         this.selection.current.focus();
      });
   }

   selectCell($cell) {
      this.selection.select($cell);
      this.$emit('table:select', $cell);
   }

   toHTML() {
      return createTable(20, this.$state());
   }

   async resizeTable(event) {
      try {
         const data = await resizeHandler(this.$root, event);
         this.$dispatch(actions.tableResize(data));
      } catch (err) {
         console.warn('Table: ', err.message);
      }
   }

   onMousedown(event) {
      if (shouldResize(event)) {
         this.resizeTable(event).then(() => {});
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
         this.selectCell($next);
         this.$emit('table:select', $next);
      }
   }

   onInput(event) {
      this.$emit('table:input', $(event.target));
   }
}

