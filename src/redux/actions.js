import { TABLE_RESIZE, CHANGE_TEXT } from './types';

export const tableResize = data => ({
   type: TABLE_RESIZE,
   data
});

export const cellsData = data => ({
   type: CHANGE_TEXT,
   data
});