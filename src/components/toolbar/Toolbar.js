import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/dom';

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
      const initialState = {
         textAlign: 'left',
         textDecoration: 'none',
         fontWeight: 'bold',
         fontStyle: 'normal'
      };
      this.initState(initialState);
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
         const key = Object.keys(value);
         this.setState({ [key]: value[key] });
      }
   }
}
