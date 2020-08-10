export class TableSelection {
   static className = 'selected';

   constructor() {
      this.group = [];
      this.current = null;
   }

   select($el) {
      this.clear();
      $el.focus().addClass(TableSelection.className);
      this.group.push($el);
      this.current = $el;
   }

   selectAddToGroup($el) {
      this.group.push($el);
      $el.addClass(TableSelection.className);
      this.current = $el;
   }

   selectGroup($group = []) {
      this.clear();
      this.group = $group;
      this.group.forEach($el => $el.addClass(TableSelection.className));
   }

   get selectedIds() {
      return this.group.map($el => {
         return $el.id();
      });
   }

   clear() {
      this.group.forEach($el => $el.removeClass(TableSelection.className));
      this.group = [];
   }

   applyStyles(styles = {}) {
      this.group.forEach($el => {
         $el.css(styles);
      });
   }
}