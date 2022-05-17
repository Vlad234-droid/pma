import React, { FC, HTMLProps, useEffect, useState } from 'react';
import { Button, CreateRule, Modal, Rule, Styles, theme, useStyle } from '@pma/dex-wrapper';
import { DropZone } from 'components/DropZone';
import Upload from 'images/Upload.svg';
import { Input, Item as FormItem } from 'components/Form';
import { getPreviousReviewFilesSelector, PreviousReviewFilesActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import { File } from './File';
import { Trans, useTranslation } from 'components/Translation';
import { Icon } from 'components/Icon';
import { RemoveFileModal } from './RemoveFileModal';

export type PreviousReviewFilesModal = {
  onOverlayClick: () => void;
  colleagueUUID?: string;
  readonly?: boolean;
};

type Props = HTMLProps<HTMLInputElement> & PreviousReviewFilesModal;

const MAX_FILES_LENGTH = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const PreviousReviewFilesModal: FC<Props> = ({ onOverlayClick, colleagueUUID, readonly }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const files: File[] = useSelector(getPreviousReviewFilesSelector) || [];
  const [filter, setFilteredValue] = useState('');
  const [showModalLimitExceeded, setShowModalLimitExceeded] = useState(false);
  const [showModalDuplicateFile, setShowModalDuplicateFile] = useState(false);
  const [showModalSizeExceeded, setShowModalSizeExceeded] = useState('');
  const [fileUuidToRemove, setFileUuidToRemove] = useState('');

  const onUpload = (file) => {
    if (files.length >= MAX_FILES_LENGTH) return setShowModalLimitExceeded(true);
    if (files.some((existingFile) => existingFile.fileName === file.name)) return setShowModalDuplicateFile(true);
    if (file.size > MAX_FILE_SIZE) return setShowModalSizeExceeded(file.name);
    dispatch(PreviousReviewFilesActions.uploadFile({ file, colleagueUUID }));
  };

  const filteredFiles = files?.filter(
    ({ fileName }) => !filter || fileName.toLowerCase().includes(filter.toLowerCase()),
  );
  const handleChangeFilter = ({ target }) => setFilteredValue(target.value);
  const openRemoveModal = (fileUuid) => setFileUuidToRemove(fileUuid);

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
        {showModalSizeExceeded && (
          <Modal
            modalPosition={mobileScreen ? 'bottom' : 'middle'}
            modalContainerRule={[containerRule({ mobileScreen }), { height: 'auto' }]}
          >
            <div className={css({ marginBottom: '18px', fontSize: '18px' })}>
              {t('size_limit_exceeded', { fileName: showModalSizeExceeded, size: '10MB' })}
            </div>
            <Button onPress={() => setShowModalSizeExceeded('')}>
              <Trans i18nKey='close'>Close</Trans>
            </Button>
          </Modal>
        )}
        {fileUuidToRemove && (
          <RemoveFileModal
            fileUuid={fileUuidToRemove}
            colleagueUUID={colleagueUUID}
            fileName={files.find(({ uuid }) => uuid === fileUuidToRemove)?.fileName || 'Unknown'}
            onClose={() => setFileUuidToRemove('')}
          />
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
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  margin: '8px 0',
});

const descriptionStyles: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f12.fontSize,
  lineHeight: theme.font.fixed.f12.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
});

// TODO: Extract duplicate 13
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

// TODO: Extract duplicate 14
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
