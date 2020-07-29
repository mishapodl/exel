import { $ } from '@core/dom';

export class TableSelection {
   constructor() {
      this.group = [];
   }

   select($el) {
      this.group.push($($el));
      $el.addClass('selected');
   }

   selectGroup() {
      console.log('groupSelect');
   }
}