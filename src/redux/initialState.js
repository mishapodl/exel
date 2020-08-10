import { storage } from '@core/utils';
import { defaultValues } from '@/constants';

const defaultState = {
   colState: {},
   rowState: {},
   dataState: {},
   stylesState: {},
   currentText: '',
   currentStyles: defaultValues,
};

const normalize = state => ({
   ...state,
   currentStyles: defaultValues,
   currentText: ''
});

export const initialState = storage('excel-state')
   ? normalize(storage('excel-state'))
   : defaultState;