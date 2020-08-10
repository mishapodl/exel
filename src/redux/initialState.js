import { storage } from '@core/utils';
import { defaultValues } from '@/constants';

const defaultState = {
   colState: {},
   rowState: {},
   dataState: {},
   currentText: '',
   currentStyles: defaultValues
};

export const initialState = storage('excel-state')
   ? storage('excel-state')
   : defaultState;