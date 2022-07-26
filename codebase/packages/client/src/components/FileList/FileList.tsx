import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Icon } from 'components/Icon';

type File = { uuid: string; name: string; href: string };
type Props = { files: Array<File>; onDelete?: (uuid: string) => void };

export const FILE_LIST_TEST_ID = 'file-list-test-id';

const FileList: FC<Props> = ({ files, onDelete }) => {
  const { css } = useStyle();
  return (
    <div data-test-id={FILE_LIST_TEST_ID}>
      {files.map(({ name, uuid, href }) => (
        <div key={uuid} className={css(fileItemRule)}>
          <a href={href} className={css(fileNameRule)} target={'_blank'} rel='noreferrer'>
            {name}
          </a>
          {onDelete && <Icon graphic={'delete'} onClick={() => onDelete(uuid)} />}
        </div>
      ))}
    </div>
  );
};

export default FileList;

const fileItemRule: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
  gap: '20px',
};

const fileNameRule: Rule = ({ theme }) => ({
  color: theme.colors.link,
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f14,
});
