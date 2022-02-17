import { FileId, SortFileValue } from 'config/enum';

export const exceptableFiles = '.pdf, .bpmn, .form, .ppt, .xls, .dmn, .doc';

export const PERFOMANCE_WRAPPER = 'PERFOMANCE_WRAPPER';
export const FILTER_MODAL_ID = 'FILTER_MODAL_ID';
export const SETTINGS_BTN_ID = 'SETTINGS_BTN_ID';
export const WRAPPER_INPUT_ID = 'WRAPPER_INPUT_ID';
export const INPUT_TEST_ID = 'INPUT_TEST_ID';

export enum DeleteStatuses {
  PENDING = 'PENDING',
  CONFIRMING = 'CONFIRMING',
  SUBMITTED = 'SUBMITTED',
}

export type FilterType = {
  sort: string;
  search: string;
};

export const getSortString = ({ sort }) => SortFileValue[sort];

export const initialFilters: FilterType = {
  sort: '',
  search: '',
};

export const filterFileType = (extention = '') => {
  return FileId?.[extention];
};
