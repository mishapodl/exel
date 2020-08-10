import { ExcelComponent } from '@core/ExcelComponent';
import { TableSelection } from './TableSelection';
import { isCell, nextSelector, shouldResize } from './table.functions';
import { createTable } from './table.tmplate';
import { resizeHandler } from './table.resize';
import { typeSelect } from './table.selection';
import { keys } from './constants';
import { $ } from '@core/dom';
import * as actions from '@/redux/actions';
import { defaultValues } from '@/constants';

export class Table extends ExcelComponent {
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
         this.updateTextInStore(text);
      });

      this.$on('formula:focusCell', () => {
         this.selection.current.focus();
      });

      this.$on('toolbar:applyStyles', styles => {
         this.selection.applyStyles(styles);
      });
   }

   selectCell($cell) {
      this.selection.select($cell);
      this.$emit('table:select', $cell);
      const styles = $cell.getStyles(Object.keys(defaultValues));
      this.$dispatch(actions.changeStyles(styles));
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
      this.selectCell($(event.target));
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

   updateTextInStore(value) {
      this.$dispatch(actions.cellsData({
         id: this.selection.current.id(),
         value
      }));
   }

   onInput(event) {
      this.updateTextInStore($(event.target).text());
   }
}

