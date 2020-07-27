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
      return createTable(20);
   }

   onMousedown(event) {
      if (event.target.dataset.resize) {
         const $resizer = $(event.target);
         const $parent = $($resizer.closest('[data-resizeable="resizeable"]'));

         const resizer = {
            $coord: $parent.coord,
            $name: $parent.text,
            $type: $resizer.dataset.resize || null,
            $style: $parent.style.style,
            $line: event.target
         };

         event.target.classList.add('lines');

         const $selector = '[data-' + resizer.$type + '="' + resizer.$name + '"]';
         const $cells = this.$root.findAll($selector);

         document.onmousemove = event => {
            resize(event, resizer);
         };

         document.onmouseup = e => {
            resize(e, resizer, $cells, true);
            event.target.classList.remove('lines');
            document.onmousemove = null;
            document.onmouseup = null;
         };
      }
   }
}

function resize(event, resizer, cells, resizedEnd = false) {
   const { $type, $style, $coord, $line } = resizer;

   const right = $coord.width - (event.pageX - $coord.x) + 'px';
   const bottom = $coord.height - (event.pageY - $coord.y) + 'px';

   $type === 'col' ? $line.style.right = right : $line.style.bottom = bottom;

   if (resizedEnd) {
      const width = event.pageX - $coord.x + 'px';
      const height = event.pageY - $coord.y + 'px';

      $type === 'col' ? $style.width = width : $style.height = height;
      $type === 'col' ? $line.style.right = '0' : $line.style.bottom = '0';

      cells.forEach((cell) => {
         $type === 'col'
            ? cell.style.width = width
            : cell.style.height = height;
      });
   }
}