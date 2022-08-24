import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, getPreviousReviewFilesSelector, PreviousReviewFilesActions } from '@pma/store';
//TODO: should move to general components
import { RemoveFileModal } from 'features/general/ReviewFiles/components/RemoveFileModal';
import { File } from './File';
import useDispatch from 'hooks/useDispatch';

type Props = {
  reviewUUID: string;
};

export const FileList: FC<Props> = ({ reviewUUID }) => {
  const { css } = useStyle();
  const files: File[] = useSelector(getPreviousReviewFilesSelector(reviewUUID)) || [];
  const [fileUuidToRemove, setFileUuidToRemove] = useState('');
  const openRemoveModal = (fileUuid: string) => setFileUuidToRemove(fileUuid);
  const colleagueUUID = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(PreviousReviewFilesActions.getPreviousReviewFiles({ colleagueUUID, reviewUUID }));
  }, [colleagueUUID, reviewUUID]);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [files.length]);

  return (
    <div className={css({ paddingBottom: '4px' })}>
      {files?.map((file) => (
        <File file={file} onDelete={openRemoveModal} key={file.uuid} />
      ))}
      {fileUuidToRemove && (
        <RemoveFileModal
          fileUuid={fileUuidToRemove}
          colleagueUUID={colleagueUUID}
          reviewUUID={reviewUUID}
          fileName={files.find(({ uuid }) => uuid === fileUuidToRemove)?.fileName || 'Unknown'}
          onClose={() => setFileUuidToRemove('')}
        />
      )}
    </div>
  );
};
