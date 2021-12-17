import React, { FC, HTMLProps, useState } from 'react';
import filesize from 'filesize';
import { CreateRule, Modal, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import { DropZone } from 'components/DropZone';
import Upload from 'components/DropZone/Upload.svg';
import Download from 'components/DropZone/Download.svg';
import Trash from 'components/DropZone/Trash.svg';
import { Input } from 'components/Form';

export type PreviousReviewFilesModal = {
  onOverlayClick: () => void;
};

type Props = HTMLProps<HTMLInputElement> & PreviousReviewFilesModal;

const PreviousReviewFilesModal: FC<Props> = ({ onOverlayClick }) => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const [files, updateFiles]: [any[], any] = useState([]);
  const [filter, setFilteredValue] = useState('');
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const onUpload = (file) => updateFiles((prev) => [...prev, file]);
  const filterFiles = (file) => !filter || file.name.toLowerCase().includes(filter);
  const deleteFile = (key) => updateFiles((prevState) => prevState.splice(key, 1));

  return (
    <>
      <Modal
        modalPosition={mobileScreen ? 'bottom' : 'middle'}
        modalContainerRule={[containerRule({ mobileScreen })]}
        title={{ content: '', styles: [modalStyles] }}
        onOverlayClick={onOverlayClick}
      >
        <Input onChange={(e) => setFilteredValue(e.target.value)} />
        <div className={css({ marginTop: '32px' })}>
          <DropZone onUpload={onUpload}>
            <img className={css({ maxWidth: 'inherit' })} src={Upload} alt='Upload' />
            <span className={css(labelStyles)}>Drop file here or click to upload</span>
            <span className={css(descriptionStyles)}>Maximum upload size 5MB</span>
          </DropZone>
        </div>
        <div className={css({ marginTop: '32px' })}>
          {files.filter(filterFiles).map((file, key) => (
            <div className={css(listItemStyles)} key={key}>
              <div className={css({ margin: '24px 0' })}>
                <div className={css(fileNameStyles)}>{file.name}</div>
                <div className={css(filesizeStyles)}>{filesize(file.size)}</div>
              </div>
              <div className={css({ display: 'flex' })}>
                <button className={css(buttonStyles)}>
                  <img src={Download} alt='Download' />
                </button>
                <button className={css(buttonStyles)} onClick={() => deleteFile(key)}>
                  <img src={Trash} alt='Trash' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

const buttonStyles = {
  backgroundColor: 'inherit',
  border: 'none',
};

const containerRule: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  width: mobileScreen ? '345px' : '500px',
  padding: '24px 38px 24px',
});

const filesizeStyles: Rule = ({ theme }) => ({
  fontSize: '14px',
  color: theme.colors.tescoBlue,
});

const fileNameStyles: Rule = ({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'bold',
  color: theme.colors.tescoBlue,
});

const labelStyles: Rule = ({ theme }) => ({
  fontSize: '16px',
  color: theme.colors.tescoBlue,
  margin: '8px 0',
});

const descriptionStyles: Rule = ({ theme }) => ({
  fontSize: '12px',
  color: theme.colors.tescoBlue,
});

const listItemStyles: Rule = ({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.colors.backgroundDarkest}`,
});

const modalStyles = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '24px',
  minHeight: '700px',
} as Styles;

export default PreviousReviewFilesModal;
