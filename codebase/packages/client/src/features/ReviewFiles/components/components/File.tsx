import React, { FC, HTMLProps } from 'react';
import filesize from 'filesize';
import { Rule, useStyle } from '@dex-ddl/core';
import Download from 'components/DropZone/Download.svg';
import Trash from 'components/DropZone/Trash.svg';
import { PreviousReviewFilesActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';

export type File = {
  fileName: string;
  fileLength: number;
  uuid: string;
};

export type FileProps = {
  file: File;
};

type Props = HTMLProps<HTMLInputElement> & FileProps;

export const File: FC<Props> = ({ file }) => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  // TODO: update delete
  const deleteFile = (uuid) => dispatch(PreviousReviewFilesActions.uploadFile(uuid));
  const getDownloadHref = ({ uuid }) => `/api/v1/files/${uuid}/download`;
  return (
    <div className={css(listItemStyles)}>
      <div className={css({ margin: '24px 0' })}>
        <div className={css(fileNameStyles)}>{file.fileName}</div>
        <div className={css(filesizeStyles)}>{filesize(file.fileLength)}</div>
      </div>
      <div className={css(buttonsWrapperStyles)}>
        <a href={getDownloadHref(file)} download>
          <img src={Download} alt='Download' />
        </a>
        <button className={css(buttonStyles)} onClick={() => deleteFile(file.uuid)}>
          <img src={Trash} alt='Trash' />
        </button>
      </div>
    </div>
  );
};

const buttonStyles = {
  backgroundColor: 'inherit',
  border: 'none',
};

const filesizeStyles: Rule = ({ theme }) => ({
  fontSize: '14px',
  color: theme.colors.tescoBlue,
});

const fileNameStyles: Rule = ({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'bold',
  color: theme.colors.tescoBlue,
});

const listItemStyles: Rule = ({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.colors.backgroundDarkest}`,
});

const buttonsWrapperStyles = { display: 'flex', alignItems: 'center' };
