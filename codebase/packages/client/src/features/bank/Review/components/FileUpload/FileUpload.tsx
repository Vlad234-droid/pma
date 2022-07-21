import React, { useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { useStyle, Button, Rule, Modal, CreateRule } from '@pma/dex-wrapper';

import Upload from 'images/Upload.svg';
import { DropZone } from 'components/DropZone';

const MAX_FILES_LENGTH = 10;
const MAX_FILE_SIZE_MB = 10;

// TODO: not ready. waiting for contract. could be feature
export const FileUpload = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();

  const files: any[] = [];
  const [showModalLimitExceeded, setShowModalLimitExceeded] = useState(false);
  const [showModalDuplicateFile, setShowModalDuplicateFile] = useState(false);
  const [showModalSizeExceeded, setShowModalSizeExceeded] = useState('');
  const onUpload = (file) => {
    if (files.length >= MAX_FILES_LENGTH) return setShowModalLimitExceeded(true);
    if (files.some((existingFile) => existingFile.fileName === file.name)) return setShowModalDuplicateFile(true);
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return setShowModalSizeExceeded(file.name);
  };

  return (
    <>
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
            {t('size_limit_exceeded', { fileName: showModalSizeExceeded, size: `${MAX_FILE_SIZE_MB}MB` })}
          </div>
          <Button onPress={() => setShowModalSizeExceeded('')}>
            <Trans i18nKey='close'>Close</Trans>
          </Button>
        </Modal>
      )}
      <DropZone styles={{ paddingTop: '20px', paddingBottom: '20px' }} onUpload={onUpload}>
        <img className={css({ maxWidth: 'inherit' })} src={Upload} alt='Upload' />
        <span className={css(uploadTextStyle)}>{t('Upload any supporting documents')}</span>
      </DropZone>
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

const uploadTextStyle: Rule = ({ theme }) => ({
  paddingTop: '6px',
  color: theme.colors.tescoBlue,
});
