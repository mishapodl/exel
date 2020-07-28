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
         const $parent = $($resizer.closest('[data-type="resizeable"]'));

         const resizer = {
            $coord: $parent.coord,
            $name: $parent.text,
            $type: $resizer.dataset.resize || null,
            $line: $(event.target)
         };

         event.target.classList.add('lines');

         document.onmousemove = event => {
            resize(event, resizer);
         };

         document.onmouseup = e => {
            resize(e, resizer, $parent, this.$root, true);
            event.target.classList.remove('lines');

            document.onmousemove = null;
            document.onmouseup = null;
         };
      }
   }
}

function resize(event, resizer, $parent, $root, resizedEnd = false) {
   const { $type, $coord, $line } = resizer;
   const right = $coord.width - (event.pageX - $coord.x) + 'px';
   const bottom = $coord.height - (event.pageY - $coord.y) + 'px';

   $type === 'col' ? $line.css({ right }) : $line.css({ bottom });

   if (resizedEnd) {
      resizeCells(event, resizer, $parent, $root);
   }
}

function resizeCells(event, resizer, $parent, $root) {
   const { $type, $coord, $line, $name } = resizer;
   const $selector = '[data-' + $type + '="' + $name + '"]';
   const $cells = $root.findAll($selector);
   const width = (event.pageX - $coord.x) + 'px';
   const height = (event.pageY - $coord.y) + 'px';

   $type === 'col' ? $parent.css({ width }) : $parent.css({ height });
   $type === 'col' ? $line.css({ right: 0 }) : $line.css({ bottom: 0 });

   $cells.forEach((cell) => {
      $type === 'col'
         ? cell.style.width = width
         : cell.style.height = height;
   });
}