const CODES = {
   A: 65,
   Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(col, colState) {
   return (colState[col] || DEFAULT_WIDTH) + 'px';
}

function getHeight(row, rowState) {
   return (rowState[row] || DEFAULT_HEIGHT) + 'px';
}

function toChar(_, index) {
   return String.fromCharCode(CODES.A + index);
}

function toColumn({ col, width, index }) {
   return `
    <div 
       class="column" 
       data-type="resizable" 
       data-col="${index}"
       style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function withWidthFrom({ colState }) {
   return function (col, index) {
      return {
         col, index, width: getWidth(index, colState)
      };
   };
}

function getText(id, dataState) {
   return dataState[id] || '';
}

function toCell(row, { colState, dataState }) {
   return function (_, col) {
      const id = row + ':' + col;
      return `
       <div 
          class="cell" 
          contenteditable 
          data-col="${col}" 
          data-type="cell" 
          data-id="${id}"
          style="width: ${getWidth(col, colState)}"
       >${getText(id, dataState)}</div>
     `;
   };
}

function createRow(index, content, { rowState }) {
   const resizer = index
      ? '<div class="row-resize" data-resize="row"></div>'
      : '';
   return `
      <div 
        class="row" 
        data-type="resizable" 
        data-row="${index}" 
        style="height: ${getHeight(index, rowState)}"
      >
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

export function createTable(countRows = 15, state = {}) {
   const colsCount = CODES.Z - CODES.A + 1;
   const rows = [];

   const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');

   rows.push(createRow(null, cols, state));

   for (let row = 0; row < countRows; row++) {
      const cells = new Array(colsCount)
         .fill('')
         .map(toCell(row, state))
         .join('');

      rows.push(createRow(row + 1, cells, state));
   }

   return rows.join('');
}