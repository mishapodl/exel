import { ExcelComponents } from '@core/ExcelComponents';
import { createTable } from '@/components/table/table.tmplate';

export class Table extends ExcelComponents {
   static className = 'excel__table';

   constructor($root) {
      super($root, {
         name: 'Table',
         listeners: ['mousedown', 'mousemove', 'mouseup', 'mouseleave']
      });
      this.resizer = {
         parent: null,
         parentName: '',
         typeResizer: '',
         widthCol: null,
         heightRow: null
      };
      this.coordinates = {
         startX: null,
         endX: null,
         startY: null,
         endY: null
      };
   }

   toHTML() {
      return createTable(2);
   }

   onMousedown(event) {
      const { resizer, coordinates } = this;

      if (event.target.dataset.resize) {
         getData(event, resizer, coordinates);
      }
   }

   onMousemove(event) {
      const { resizer, coordinates } = this;

      if (resizer.parent !== null) {
         coordinates.endX = event.x;
         coordinates.endY = event.y;
         resize(resizer, coordinates);
      }
   }

   onMouseup(event) {
      this.resizer.parent = null;
      this.coordinates = {};
   }

   onMouseleave() {
      this.coordinates = {};
   }
}

function resize(resizer, coordinates) {
   const { startX, endX, startY, endY } = coordinates;
   const {
      parent: { style },
      typeResizer,
      parentName,
      widthCol,
      heightRow
   } = resizer;

   const width = widthCol + (endX - startX) + 'px';
   const height = heightRow + (endY - startY) + 'px';

   const selector = `[data-${typeResizer}=\"${parentName}\"]`;
   const cells = document.querySelectorAll(selector);

   typeResizer === 'col' ? style.width = width : style.height = height;

   [...cells].forEach((cell) => {
      typeResizer === 'col'
         ? (cell.style.width = width)
         : (cell.style.height = height);
   });
}

function getData(event, resizer, coordinates) {
   const { dataset, parentNode } = event.target;

   resizer.parent = event.target.closest('[data-parent="row"]');
   resizer.parentName = parentNode.textContent.trim();
   resizer.typeResizer = dataset.resize;

   resizer.widthCol = resizer.parent.offsetWidth;
   resizer.heightRow = resizer.parent.offsetHeight;

   coordinates.startX = event.x;
   coordinates.startY = event.y;
}