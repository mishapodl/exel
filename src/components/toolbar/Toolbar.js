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

   onClick(event) {
      const $target = $(event.target);
      if ($target.data.value) {
         const value = JSON.parse($target.data.value);
         this.$emit('toolbar:applyStyles', value);

         const key = Object.keys(value);
         this.setState({ [key]: value[key] });
      }
   }
}
