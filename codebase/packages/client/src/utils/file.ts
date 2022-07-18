import { FileDescription, FileExtensions } from 'config/enum';

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
