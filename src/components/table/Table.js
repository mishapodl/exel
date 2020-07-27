import { ExcelComponents } from '@core/ExcelComponents';
import { createTable } from '@/components/table/table.tmplate';
import { $ } from '@core/dom';

export class Table extends ExcelComponents {
   static className = 'excel__table';

   constructor($root) {
      super($root, {
         name: 'Table',
         listeners: ['mousedown']
      });
   }

   toHTML() {
      return createTable(5);
   }

   onMousedown(event) {
      if (!event.target.dataset.resize) return;

      const $resizer = $(event.target);
      const $parent = $($resizer.closest('[data-resizeable="resizeable"]'));

      const resizer = {
         $coord: $parent.coord,
         $name: $parent.text,
         $type: $resizer.dataset.resize || null,
         $style: $parent.style.style
      };

      event.target.classList.add('lines');

      const $selector = '[data-'+resizer.$type+'="'+resizer.$name+'"]';
      const $cells = document.querySelectorAll($selector);

      document.onmousemove = event => {
         resize(event, resizer, $cells);
      };

      document.onmouseup = () => {
         event.target.classList.remove('lines');
         document.onmousemove = null;
      };
   }
}

function resize({ pageX, pageY }, resizer, cells) {
   const { $type, $style, $coord } = resizer;

   const width = pageX- $coord.x + 'px';
   const height = pageY - $coord.y + 'px';

   $type === 'col'
      ? $style.width = width
      : $style.height = height;

   cells.forEach((cell) => {
      $type === 'col'
         ? (cell.style.width = width)
         : (cell.style.height = height);
   });
}