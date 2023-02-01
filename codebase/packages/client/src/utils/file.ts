import { FileDescription, FileExtensions } from 'config/enum';
import { httpClient } from '@pma/api';

export const downloadFile = async (
  url: any,
  success: (blob: Blob) => void,
  loaded: () => void,
  failure: () => void,
) => {
  httpClient({
    ...url,
    method: 'GET',
    responseType: 'blob',
  })
    .then((data) => {
      if (data instanceof Blob) {
        return success(data);
      }
      new Error('data not supported');
    })
    .catch(failure)
    .finally(() => loaded());
};

export const createFile = (fileName: string) => (blob: Blob) => {
  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export const makeBinaryFromObject = <T extends unknown>(data: T) =>
  new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });
// TODO: fix regex
const fileExtensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gim;
const fileExtensionWithoutDot = (name) => name.split('.').pop();

export const getFileExtension = (fileName) => {
  return fileName.match(fileExtensionPattern)[0];
};

export const getFileType = (fileName) => {
  const code = fileExtensionWithoutDot(getFileExtension(fileName));

  return {
    code,
    description: FileDescription[code.toUpperCase()],
    id: FileExtensions[code.toUpperCase()],
  };
};
