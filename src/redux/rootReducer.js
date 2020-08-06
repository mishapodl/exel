import { TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
   let prevState;

   switch (action.type) {
      case TABLE_RESIZE:
         prevState = state.colState || [];
         prevState = [...state.colState, action.data];

         return {
            ...state,
            colState: prevState
         };
      default:
         return state;
   }
}