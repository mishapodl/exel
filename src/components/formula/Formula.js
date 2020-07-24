import { ExcelComponents } from '@core/ExcelComponents';

export class Formula extends ExcelComponents {
   static className = 'excel__formula';

   constructor($root) {
      super($root, {
         name: 'Formula',
         listeners: ['click']
      });
   }

   toHTML() {
      return `
         <div class="info">fx</div>
         <div class="input" contenteditable spellcheck="false"></div>
      `;
   }

   onClick() {
      console.log('FormulaOnClick');
   }
   onInput() {
      console.log('FormulaOnInput');
   }
}