import { range } from '@core/utils';
import { $ } from '@core/dom';

export function typeSelect ($root, selection, event) {
   const { ctrlKey, shiftKey, target } = event;

   if (!ctrlKey && !shiftKey) {
      selection.select($(target));
   } else if (ctrlKey) {
      selection.selectAddToGroup($(target));
   } else if (shiftKey) {
      multiSelect($root, selection, $(target));
   }
}

function matrix ($current, $target) {
   const current = $current.current.id(true);
   const target = $target.id(true);

   const $cols = range(current.col, target.col);
   const $rows = range(current.row, target.row);

   return $cols.reduce((acc, col) => {
      $rows.forEach(el => acc.push(`${el}:${col}`));
      return acc;
   }, []);
}

function multiSelect ($root, selection, target) {
   const $cells = matrix(selection, target)
      .map(id => $root.find('[data-id="' + id + '"]'));
   selection.selectGroup($cells);
}