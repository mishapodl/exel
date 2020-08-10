import {
   TABLE_RESIZE,
   CHANGE_TEXT,
   CHANGE_STYLES,
   APPLY_STYLES
} from './types';

export const tableResize = data => ({
   type: TABLE_RESIZE,
   data
});

export const cellsData = data => ({
   type: CHANGE_TEXT,
   data
});

export const changeStyles = data => ({
   type: CHANGE_STYLES,
   data
});

export const applyStyles = data => ({
   type: APPLY_STYLES,
   data
});