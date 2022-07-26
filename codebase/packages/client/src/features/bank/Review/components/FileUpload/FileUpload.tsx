import React, { FC, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { BASE_URL_API } from 'config/constants';
import { Review, Status } from 'config/types';

import Upload from 'images/Upload.svg';
import { DropZone } from 'components/DropZone';
import FileList from 'components/FileList';
import { ConfirmModal } from 'components/ConfirmModal';

import { FileNotificationModal } from '../FileNotificationModal';
import { FileMetadata } from '../../type';

export type FilesProps = {
  review: Review;
  metadata: FileMetadata[];
  handleAddFiles: (file: File) => void;
  handleDeleteFiles: (name: string) => void;
};

const MAX_FILES_LENGTH = 10;
const MAX_FILE_SIZE_MB = 10;

export const FileUpload: FC<FilesProps> = ({ handleAddFiles, metadata, handleDeleteFiles, review }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { colleagueUuid, status } = review || {};

  const editable = [Status.DRAFT, Status.DECLINED].includes(status);
  const getDownloadHref = (fileUuid) =>
    `${BASE_URL_API}/colleagues/${colleagueUuid}/reviews/files/${fileUuid}/download`;

  const fileList = useMemo(
    () =>
      metadata.map(({ fileName, uuid }) => ({
        name: fileName,
        uuid: fileName,
        href: uuid ? getDownloadHref(uuid) : '#',
      })),
    [metadata],
  );

  const [fileNameRemove, setFileName] = useState<string>('');

  const [showModalLimitExceeded, setShowModalLimitExceeded] = useState(false);
  const [showModalDuplicateFile, setShowModalDuplicateFile] = useState(false);
  const [showModalSizeExceeded, setShowModalSizeExceeded] = useState('');

  const onUpload = (file) => {
    if (file.length >= MAX_FILES_LENGTH) return setShowModalLimitExceeded(true);
    if (metadata.some((existingFile) => existingFile.fileName === file.name)) return setShowModalDuplicateFile(true);
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return setShowModalSizeExceeded(file.name);
    if (handleAddFiles) handleAddFiles(file);
  };

  return (
    <>
      <FileNotificationModal
        show={showModalLimitExceeded}
        handleClose={() => setShowModalLimitExceeded(false)}
        text={t('file_limit_exceeded', 'File limit exceeded')}
      />
      <FileNotificationModal
        show={showModalDuplicateFile}
        handleClose={() => setShowModalDuplicateFile(false)}
        text={t('duplicate_file', 'Duplicate file. You have already uploaded a file with same name')}
      />
      <FileNotificationModal
        show={!!showModalSizeExceeded}
        handleClose={() => setShowModalSizeExceeded('')}
        text={t('size_limit_exceeded', { fileName: showModalSizeExceeded, size: `${MAX_FILE_SIZE_MB}MB` })}
      />
      {editable && (
        <DropZone styles={{ paddingTop: '20px', paddingBottom: '20px' }} onUpload={onUpload}>
          <img className={css({ maxWidth: 'inherit' })} src={Upload} alt='Upload' />
          <span className={css(uploadTextStyle)}>{t('Upload any supporting documents')}</span>
        </DropZone>
      )}
      <FileList files={fileList} {...(editable ? { onDelete: setFileName } : {})} />
      {fileNameRemove && (
        <ConfirmModal
          title={t('do_you_want_to_delete', 'Do you want to delete')}
          onSave={() => {
            handleDeleteFiles(fileNameRemove);
            setFileName('');
          }}
          submitBtnTitle={<Trans i18nKey={'delete'}>Delete</Trans>}
          onCancel={() => setFileName('')}
          onOverlayClick={() => setFileName('')}
        />
      )}
    </>
  );
};

const uploadTextStyle: Rule = ({ theme }) => ({
  paddingTop: '6px',
  color: theme.colors.tescoBlue,
});
