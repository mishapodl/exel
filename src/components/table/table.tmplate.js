const CODES = {
   A: 65,
   Z: 90
};

function toChar(_, index) {
   return String.fromCharCode(CODES.A + index);
}

function toColumn(col) {
   return `
         <div class="column" data-parent="resizeable">${col}
             <div class="col-resize" data-resize="col"></div>
         </div>
     `;
}

function toCell(indexCol, indexRow) {
   return `
         <div 
             class="cell" 
             contenteditable 
             data-row=${indexRow}
             data-col="${toChar(null, indexCol)}" 
         ></div>
     `;
}

function createRow(index, row) {
   const resizer = index
      ? '<div class="row-resize" data-resize="row"></div>'
      : '';

   return `
       <div class="row" data-parent="resizeable">
         <div class="row-info">
             ${index ? index : ''}
             ${resizer}
         </div>
          <div class="row-data">
             ${row}
          </div>
       </div>
    `;
}

export function createTable(countRows = 15) {
   const colsCount = CODES.Z - CODES.A + 1;
   const rows = [];

   const cols = new Array(colsCount)
      .fill('')
      .map(toChar) // (_, index) => toChar(_, index))
      .map(toColumn) // el => toColumn(el)
      .join('');

   rows.push(createRow(null, cols));

   for (let i = 1; i <= countRows; i++) {
      const cells = new Array(colsCount)
         .fill('')
         .map((_, index) => toCell(index, i)) // () => toCell()
         .join('');

      rows.push(createRow(i, cells));
   }

   return rows.join('')
}