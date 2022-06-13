import { FileId, SortFileValue, FileExtensions } from 'config/enum';
import { getFileExtension } from 'utils/file';
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
  extension: string;
};

export const getSortString = (sort) => SortFileValue[sort];

export const initialFilters: FilterType = {
  sort: '',
  search: '',
  extension: '',
};

export const filterFileType = (extention = '') => {
  return FileId?.[extention];
};

export const checkForExtenstion = (name) => exceptableFiles.includes(getFileExtension(name));

const fieldExtensions = [
  FileExtensions.BPMN,
  FileExtensions.FORM,
  FileExtensions.PDF,
  FileExtensions.PPT,
  FileExtensions.XLS,
  FileExtensions.DMN,
  FileExtensions.DOC,
];

export const setAdditionalFields = (extension) =>
  fieldExtensions.map((item, i) => {
    return {
      id: i.toString(),
      label: FileExtensions[item],
      checked: extension.includes(FileExtensions[item]),
      text: FileExtensions[item],
    };
  });
