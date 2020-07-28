const CODES = {
   A: 65,
   Z: 90
};

function toChar(_, index) {
   return String.fromCharCode(CODES.A + index);
}

function toColumn(col, index) {
   return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(_, col) {
   return `
    <div class="cell" contenteditable data-col="${col}"></div>
  `;
}

function createRow(index, content) {
   const resizer = index
      ? '<div class="row-resize" data-resize="row"></div>'
      : '';

   return `
      <div class="row" data-type="resizable">
        <div class="row-info">
            ${index ? index : ''}
            ${resizer}
        </div>
         <div class="row-data">
            ${content}
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

   for (let i = 0; i < countRows; i++) {
      const cells = new Array(colsCount)
         .fill('')
         .map(toCell)// () => toCell()
         .join('');

      rows.push(createRow(i + 1, cells));
   }

   return rows.join('');
}