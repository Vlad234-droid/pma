import { useEffect, useState, useCallback } from 'react';
import {
  getPreviousReviewFilesSelector,
  PreviousReviewFilesActions,
  previousReviewFilesMetaSelector,
} from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import { FileMetadata } from '../type';

type Props = { colleagueUuid: string; reviewUuid: string };

type Return = {
  files: File[];
  metadata: FileMetadata[];
  handleAddFiles: (file: File) => void;
  handleDeleteFiles: (name: string) => void;
};

export const useUploadReviewFiles = ({ colleagueUuid, reviewUuid }: Props): Return => {
  const dispatch = useDispatch();
  const { loaded = false } = useSelector(previousReviewFilesMetaSelector);
  const filesInStore: FileMetadata[] = useSelector(getPreviousReviewFilesSelector(reviewUuid)) || [];

  const [metadata, setMetadata] = useState<FileMetadata[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!loaded && colleagueUuid && reviewUuid) {
      dispatch(
        PreviousReviewFilesActions.getPreviousReviewFiles({ colleagueUUID: colleagueUuid, reviewUUID: reviewUuid }),
      );
    }
  }, [loaded, colleagueUuid, reviewUuid]);

  useEffect(() => {
    if (loaded) {
      const metadataList: FileMetadata[] = filesInStore.map((file) => ({
        ...file,
        path: `/home/${colleagueUuid}/reviews/${reviewUuid}`,
        fileName: file.fileName,
      }));
      setMetadata(metadataList);
    }
  }, [filesInStore, loaded]);

  const handleAddFiles = useCallback(
    (file: File) => {
      setMetadata([
        ...metadata,
        {
          path: `/home/${colleagueUuid}/reviews/${reviewUuid}`,
          fileName: file.name,
          type: {
            id: 3,
            code: 'PDF',
            description: 'Portable document format file',
          },
          status: 'ACTIVE',
          description: 'text templates',
          fileDate: new Date().toISOString(),
        },
      ]);
      setFiles([...files, file]);
    },
    [metadata, files],
  );

  const handleDeleteFiles = useCallback(
    (name: string) => {
      setFiles(files.filter((file) => file.name !== name));
      setMetadata(metadata.filter((file) => file.fileName !== name));
    },
    [metadata, files],
  );

  return { files, metadata, handleAddFiles, handleDeleteFiles };
};
