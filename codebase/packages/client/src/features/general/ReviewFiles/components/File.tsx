import React, { FC } from 'react';
import filesize from 'filesize';
import { Rule, useStyle } from '@pma/dex-wrapper';
import Download from 'components/DropZone/Download.svg';
import Trash from 'components/DropZone/Trash.svg';
import { BASE_URL_API } from 'config/constants';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector } from '@pma/store';

export const TEST_ID = 'button-id';

export type File = {
  fileName: string;
  fileLength: number;
  uuid: string;
};

export type Props = {
  file: File;
  onDelete: (uuid: string) => void;
  readonly?: boolean;
};

const File: FC<Props> = ({ file, onDelete, readonly }) => {
  const { css } = useStyle();
  const { fileName, fileLength, uuid } = file;
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const getDownloadHref = (fileUuid) =>
    `${BASE_URL_API}/colleagues/${colleagueUuid}/reviews/files/${fileUuid}/download`;

  return (
    <div className={css(listItemStyles)}>
      <div className={css({ margin: '24px 0' })}>
        <div className={css(fileNameStyles)}>{fileName}</div>
        <div className={css(filesizeStyles)}>{filesize(fileLength)}</div>
      </div>
      <div className={css(buttonsWrapperStyles)}>
        <a href={getDownloadHref(uuid)} download>
          <img src={Download} alt='Download' />
        </a>
        {!readonly && (
          <button className={css(buttonStyles)} onClick={() => onDelete(uuid)} data-test-id={TEST_ID}>
            <img src={Trash} alt='Trash' />
          </button>
        )}
      </div>
    </div>
  );
};

export default File;

const buttonStyles = {
  backgroundColor: 'inherit',
  border: 'none',
  cursor: 'pointer',
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
  // @ts-ignore
  borderBottom: `2px solid ${theme.colors.lightGray}`,
});

const buttonsWrapperStyles = { display: 'flex', alignItems: 'center' };
