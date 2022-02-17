import { FileDescription, FileId } from 'config/enum';

export const makeBinaryFromObject = <T extends unknown>(data: T) =>
  new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });

const getFileExtension = (fileName) => fileName.split('.').pop();

export const getFileType = (fileName) => {
  const code = getFileExtension(fileName);
  return {
    code,
    description: FileDescription[code.toUpperCase()],
    id: FileId[code.toUpperCase()],
  };
};
