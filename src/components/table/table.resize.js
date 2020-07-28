import { $ } from '@core/dom';

export function resizeHandler($root, event) {
   const $resizer = $(event.target);
   const $parent = $($resizer.closest('[data-type="resizeable"]'));

   const resizer = {
      $coord: $parent.coord,
      $name: $parent.text,
      $type: $resizer.dataset.resize || null,
      $line: $(event.target)
   };

   $resizer.classToggle('lines');

   document.onmousemove = event => {
      resize(event, resizer);
   };

   document.onmouseup = event => {
      resize(event, resizer, $parent, $root, true);
      $resizer.classToggle('lines');

      document.onmousemove = null;
      document.onmouseup = null;
   };
}

function resize(event, resizer, $parent, $root, resizedEnd = false) {
   const { $type, $coord, $line } = resizer;

   const X = event.pageX - $coord.x + 'px';
   const Y = event.pageY - $coord.y + 'px';

   $type === 'col' ? $line.css({ left: X }) : $line.css({ top: Y });

   if (resizedEnd) {
      resizeCells(resizer, $parent, $root, { X, Y });
   }
}


function resizeCells(resizer, $parent, $root, { X, Y }) {
   const { $type, $name, $line } = resizer;

   $type === 'col' ? $line.css({ left: 'unset' }) : $line.css({ top: 'unset' });
   $type === 'col' ? $parent.css({ width: X }) : $parent.css({ height: Y });

   $root
      .findAll('[data-' + $type + '="' + $name + '"]')
      .forEach((cell) => {
         $type === 'col'
            ? cell.style.width = X
            : cell.style.height = Y;
      });
}