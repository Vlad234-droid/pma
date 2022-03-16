import React, { FC, HTMLProps, useEffect, useState } from 'react';
import { Button, CreateRule, Modal, Rule, Styles, theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import { DropZone } from 'components/DropZone';
import Upload from 'images/Upload.svg';
import { Input, Item as FormItem } from 'components/Form';
import { getPreviousReviewFilesSelector, PreviousReviewFilesActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import { File } from './File';
import { Trans, useTranslation } from 'components/Translation';
import { Icon } from 'components/Icon';

export type PreviousReviewFilesModal = {
  onOverlayClick: () => void;
  colleagueUUID?: string;
  readonly?: boolean;
};

type Props = HTMLProps<HTMLInputElement> & PreviousReviewFilesModal;

const MAX_FILES_LENGTH = 10;

const PreviousReviewFilesModal: FC<Props> = ({ onOverlayClick, colleagueUUID, readonly }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [, isBreakpoint] = useBreakpoints();
  const dispatch = useDispatch();
  const files: File[] = useSelector(getPreviousReviewFilesSelector) || [];
  const [filter, setFilteredValue] = useState('');
  const [showModalLimitExceeded, setShowModalLimitExceeded] = useState(false);
  const [showModalDuplicateFile, setShowModalDuplicateFile] = useState(false);
  const [fileUuidToRemove, setFileUuidToRemove] = useState('');
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const onUpload = (file) => {
    if (files.length >= MAX_FILES_LENGTH) return setShowModalLimitExceeded(true);
    if (files.some((existingFile) => existingFile.fileName === file.name)) return setShowModalDuplicateFile(true);
    dispatch(PreviousReviewFilesActions.uploadFile({ file, colleagueUUID }));
  };

  const filteredFiles = files?.filter(
    ({ fileName }) => !filter || fileName.toLowerCase().includes(filter.toLowerCase()),
  );
  const handleChangeFilter = ({ target }) => setFilteredValue(target.value);
  const openRemoveModal = (fileUuid) => setFileUuidToRemove(fileUuid);
  const removeFile = () => {
    dispatch(PreviousReviewFilesActions.deleteFile({ fileUuid: fileUuidToRemove, colleagueUUID }));
    setFileUuidToRemove('');
  };

  useEffect(() => {
    dispatch(PreviousReviewFilesActions.getPreviousReviewFiles({ colleagueUUID }));
  }, []);

  if (!colleagueUUID) return null;

  return (
    <>
      <Modal
        modalPosition={mobileScreen ? 'bottom' : 'middle'}
        overlayColor={'tescoBlue'}
        modalContainerRule={[containerRule({ mobileScreen })]}
        closeOptions={{
          content: <Icon graphic='cancel' invertColors={true} />,
          onClose: onOverlayClick,
          styles: [modalCloseOptionStyle({ mobileScreen })],
        }}
        title={{
          content: 'Previous review files',
          styles: [modalTitleOptionStyle({ mobileScreen })],
        }}
        onOverlayClick={onOverlayClick}
      >
        {showModalLimitExceeded && (
          <Modal
            modalPosition={mobileScreen ? 'bottom' : 'middle'}
            modalContainerRule={[containerRule({ mobileScreen }), { height: 'auto' }]}
          >
            <div className={css({ marginBottom: '18px', fontSize: '18px' })}>
              <Trans i18nKey='file_limit_exceeded'>File limit exceeded</Trans>
            </div>
            <Button onPress={() => setShowModalLimitExceeded(false)}>
              <Trans i18nKey='close'>Close</Trans>
            </Button>
          </Modal>
        )}
        {showModalDuplicateFile && (
          <Modal
            modalPosition={mobileScreen ? 'bottom' : 'middle'}
            modalContainerRule={[containerRule({ mobileScreen }), { height: 'auto' }]}
          >
            <div className={css({ marginBottom: '18px', fontSize: '18px' })}>
              <Trans i18nKey='duplicate_file'>Duplicate file. You have already uploaded a file with same name</Trans>
            </div>
            <Button onPress={() => setShowModalDuplicateFile(false)}>
              <Trans i18nKey='close'>Close</Trans>
            </Button>
          </Modal>
        )}
        {fileUuidToRemove && (
          <Modal
            modalPosition={mobileScreen ? 'bottom' : 'middle'}
            modalContainerRule={[containerRule({ mobileScreen }), { height: 'auto' }]}
          >
            <div className={css({ marginBottom: '18px', fontSize: '18px' })}>
              <Trans>Do you want to remove the file?</Trans>
            </div>
            <div className={css({ display: 'flex', gap: '10px', marginLeft: 'auto' })}>
              <Button onPress={() => setFileUuidToRemove('')}>
                <Trans>Close</Trans>
              </Button>
              <Button onPress={removeFile}>
                <Trans>Remove</Trans>
              </Button>
            </div>
          </Modal>
        )}
        <FormItem
          withIcon={false}
          marginBot={false}
          customIcon
          customIconInserted={<Icon graphic='search' iconStyles={iconStyles} />}
        >
          <Input onChange={handleChangeFilter} placeholder={'Search file'} />
        </FormItem>
        {!readonly && (
          <div className={css({ marginTop: '32px', width: '100%' })}>
            <DropZone onUpload={onUpload}>
              <img className={css({ maxWidth: 'inherit' })} src={Upload} alt='Upload' />
              <span className={css(labelStyles)}>{t('Drop file here or click to upload')}</span>
              <span className={css(descriptionStyles)}>{t('Maximum upload size 5MB')}</span>
            </DropZone>
          </div>
        )}
        <div className={css(fileListStyles)}>
          {filteredFiles?.map((file) => (
            <File file={file} onDelete={openRemoveModal} key={file.uuid} readonly={readonly} />
          ))}
        </div>
      </Modal>
    </>
  );
};

const containerRule: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  width: mobileScreen ? '345px' : '500px',
  padding: '36px',
  height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
  marginTop: '70px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
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

const modalCloseOptionStyle: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    display: 'inline-block',
    height: '24px',
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'fixed',
    top: '22px',
    right: mobileScreen ? '20px' : '40px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

const modalTitleOptionStyle: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    fontWeight: theme.font.weight.bold,
    ...(mobileScreen
      ? {
          fontSize: `${theme.font.fixed.f20.fontSize}`,
          lineHeight: `${theme.font.fluid.f24.lineHeight}`,
        }
      : {
          fontSize: `${theme.font.fixed.f24.fontSize}`,
          lineHeight: `${theme.font.fluid.f28.lineHeight}`,
        }),
  };
};

const iconStyles: Rule = {
  width: '19px',
};

const fileListStyles = {
  marginTop: '32px',
  overflow: 'auto',
  width: '100%',
} as Styles;

export default PreviousReviewFilesModal;
