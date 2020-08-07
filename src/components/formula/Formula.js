import { ExcelComponents } from '@core/ExcelComponents';
import { $ } from '@core/dom';

export class Formula extends ExcelComponents {
   static className = 'excel__formula';

   constructor($root, options) {
      super($root, {
         name: 'Formula',
         listeners: ['input', 'keydown'],
         ...options
      });
   }

   toHTML() {
      return `
         <div class="info">fx</div>
         <div 
            id="formula" 
            class="input" 
            contenteditable 
            spellcheck="false"
         >
        </div>
      `;
   }

   init() {
      super.init();

      this.$formula = this.$root.find('#formula');

      this.$on('table:select', ($cell = '') => {
         this.$formula.text($cell.text());
      });
      this.$subscribe(state => {
         this.$formula.text(state.currentText);
      });
   }

   onInput(event) {
      this.$emit('formula:input', $(event.target).text());
   }

   onKeydown(event) {
      if ('Enter' === event.key || 'Tab' === event.key) {
         event.preventDefault();
         this.$emit('formula:focusCell', event.key);
      }
   }
}