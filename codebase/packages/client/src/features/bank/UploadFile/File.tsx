import React, { FC } from 'react';
import filesize from 'filesize';
import { useStyle } from '@pma/dex-wrapper';
import { BASE_URL_API } from 'config/constants';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector } from '@pma/store';
import { TileWrapper } from 'components/Tile';
import { IconButton, Position } from 'components/IconButton';

export type File = {
  fileName: string;
  fileLength: number;
  uuid: string;
};

export type Props = {
  file: File;
  onDelete: (uuid: string) => void;
};

export const File: FC<Props> = ({ file, onDelete }) => {
  const { css } = useStyle();
  const { fileName, fileLength, uuid } = file;
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const downloadHref = `${BASE_URL_API}/colleagues/${colleagueUuid}/reviews/files/${uuid}/download`;

  const handleDelete = () => {
    onDelete(uuid);
  };

  return (
    <div className={css({ marginTop: '8px' })}>
      <TileWrapper>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            paddingRight: '12px',
          })}
        >
          <a href={downloadHref} download>
            <div className={css({ display: 'flex', alignItems: 'center', margin: '6px 12px', whiteSpace: 'nowrap' })}>
              <IconButton graphic={'fileAttached'} iconProps={{ title: `Download ${fileName}` }}>
                {fileName}
              </IconButton>
            </div>
          </a>

          <div className={css({ fontSize: '14px', marginRight: '12px', width: '100%', textAlign: 'right' })}>
            {filesize(fileLength)}
          </div>

          <IconButton
            onPress={handleDelete}
            graphic='trash'
            iconStyles={{ width: '20px', height: '20px' }}
            iconPosition={Position.RIGHT}
            iconProps={{ title: `Delete ${fileName}` }}
          />
        </div>
      </TileWrapper>
    </div>
  );
};
