import { ExcelComponents } from '@core/ExcelComponents';

export class Toolbar extends ExcelComponents {
   static className = 'excel__toolbar';

   constructor($root) {
      super($root, {
         name: 'Toolbar',
         listeners: ['input']
      });
   }

   toHTML() {
      return `
         <div class="button">
            <span class="material-icons">format_align_left</span>
         </div>
         <div class="button">
            <span class="material-icons">format_align_center</span>
         </div>
         <div class="button">
            <span class="material-icons">format_align_right</span>
         </div>
         <div class="button">
            <span class="material-icons">format_italic</span>
         </div>
         <div class="button">
            <span class="material-icons">format_bold</span>
         </div>
         <div class="button">
            <span class="material-icons">format_underlined</span>
         </div>
      `;
   }

   onClick() {
      console.log('ToolbarOnToolbar');
   }
   onInput() {
      console.log('ToolbarOnToolbar');
   }
}
