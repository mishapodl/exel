import { TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
   let prevState;
   let field;

   switch (action.type) {
      case TABLE_RESIZE:
         const { id, type, value } = action.data;
         field = type === 'col' ? 'colState' : 'rowState';

         prevState = state[field];
         prevState[id] = value;

         return {
            ...state,
            [field]: prevState
         };
      default:
         return state;
   }
}