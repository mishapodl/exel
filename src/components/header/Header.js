import { ExcelComponents } from '@core/ExcelComponents';

export class Header extends ExcelComponents {
   static className = 'excel__header';

   toHTML() {
      return `
         <input
            type="text"
            name=""
            class="input"
            value="Название таблицы"
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
}
