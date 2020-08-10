import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import * as actions from '@/redux/actions';
import { defaultTitle } from '@/constants';
import { debounce } from '@core/utils';

export class Header extends ExcelComponent {
   static className = 'excel__header';

   constructor($root, options) {
      super($root, {
         name: 'Header',
         listeners: ['input'],
         subscribe: ['title'],
         ...options
      });
   }

   prepare() {
      this.onInput = debounce(this.onInput, 300);
   }

   toHTML() {
      return `
         <input
            type="text"
            name=""
            class="input"
            value="${this.store.getState().title || defaultTitle}"
         />
         <div>
            <div class="button">
               <span class="material-icons">delete</span>
            </div>
            <div class="button">
               <span class="material-icons">exit_to_app</span>
            </div>
         </div>
      `;
   }

   onInput(event) {
      const $target = $(event.target);
      this.$dispatch(actions.changeTitle($target.val()));
   }
}
