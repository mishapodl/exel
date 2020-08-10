import { storage } from '@core/utils';
import { defaultValues, defaultTitle } from '@/constants';

const defaultState = {
   colState: {},
   rowState: {},
   dataState: {},
   stylesState: {},
   currentText: '',
   currentStyles: defaultValues,
   title: defaultTitle
};

const normalize = state => ({
   ...state,
   currentStyles: defaultValues,
   currentText: ''
});

export const initialState = storage('excel-state')
   ? normalize(storage('excel-state'))
   : defaultState;