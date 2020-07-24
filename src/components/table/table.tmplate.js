const CODES = {
   A: 65,
   Z: 90
};

function toChar(_, index) {
   return String.fromCharCode(CODES.A + index);
}

function toColumn(col) {
   return `<div class="column">${col}</div>`;
}

function toCell() {
   return `<div class="cell" contenteditable></div>`;
}

function createRow(index, row) {
   return `
      <div class="row">
        <div class="row-info">${index ? index : ''}</div>
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

   const cells = new Array(colsCount)
      .fill('')
      .map(toCell) // () => toCell()
      .join('');

   for (let i = 1; i <= countRows; i++) {
      rows.push(createRow(i, cells));
   }

   return rows.join('');
}