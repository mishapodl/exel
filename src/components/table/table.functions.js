export function shouldResize(event) {
   return event.target.dataset.resize;
}

export function isCell(event) {
   return event.target.dataset.type;
}
export function nextSelector(key, { col, row }) {
   switch (key) {
      case 'ArrowRight':
      case 'Tab':
         ++col;
         break;
      case 'ArrowDown':
      case 'Enter':
         ++row;
         break;
      case 'ArrowUp':
         row = row-1 < 0 ? 0 : row-1;
         break;
      case 'ArrowLeft':
         col = col-1 < 0 ? 0 : col-1;
         break;
   }
   return `[data-id="${row}:${col}"]`;
}