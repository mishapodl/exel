import { TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
   let prevStateCol;
   let prevStateRow;

   switch (action.type) {
      case TABLE_RESIZE:
         prevStateCol = state.colState || {};
         prevStateRow = state.rowState || {};

         if (action.data.type === 'col') {
            prevStateCol[action.data.id] = action.data.value;
         } else {
            prevStateRow[action.data.id] = action.data.value;
         }

         return {
            ...state,
            colState: prevStateCol,
            rowState: prevStateRow
         };
      case '':
         return {};
      default:
         return state;
   }
}