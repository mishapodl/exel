import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/dom';
import { defaultValues } from '@/constants';

export class Toolbar extends ExcelStateComponent {
   static className = 'excel__toolbar';

   constructor($root, options) {
      super($root, {
         name: 'Toolbar',
         listeners: ['click'],
         subscribe: ['currentStyles'],
         ...options
      });
   }

   prepare() {
      this.initState(defaultValues);
   }

   get template() {
      return createToolbar(this.state);
   }

   toHTML() {
      return this.template;
   }

   storeChanged({ currentStyles }) {
      this.setState(currentStyles);
   }

   onClick(event) {
      const $target = $(event.target);
      if ($target.data.value) {
         const value = JSON.parse($target.data.value);
         this.$emit('toolbar:applyStyles', value);
      }
   }
}
