import { FileDescription, FileId } from 'config/enum';

export const makeBinaryFromObject = <T extends unknown>(data: T) =>
  new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });

const getFileExtension = (fileName) => fileName.split('.').pop();

const fileDescription = (fileName) => FileDescription[getFileExtension(fileName).toUpperCase()];

export const fileType = (fileName) => {
  return {
    code: getFileExtension(fileName),
    description: fileDescription(fileName),
    id: FileId[getFileExtension(fileName).toUpperCase()],
  };
};
