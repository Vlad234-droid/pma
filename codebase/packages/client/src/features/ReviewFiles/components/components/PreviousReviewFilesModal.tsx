import React, { FC, HTMLProps, useEffect, useState } from 'react';
import { Button, CreateRule, Modal, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import { DropZone } from 'components/DropZone';
import Upload from 'images/Upload.svg';
import { Input } from 'components/Form';
import { currentUserSelector, getPreviousReviewFilesSelector, PreviousReviewFilesActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import { File } from './File';
import { Trans, useTranslation } from 'components/Translation';

export type PreviousReviewFilesModal = {
  onOverlayClick: () => void;
};

type Props = HTMLProps<HTMLInputElement> & PreviousReviewFilesModal;

const MAX_FILES_LENGTH = 10;

const PreviousReviewFilesModal: FC<Props> = ({ onOverlayClick }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [, isBreakpoint] = useBreakpoints();
  const dispatch = useDispatch();
  const {
    info: { colleagueUUID },
  } = useSelector(currentUserSelector);
  const files: File[] = useSelector(getPreviousReviewFilesSelector) || [];
  const [filter, setFilteredValue] = useState('');
  const [showModalLimitExceeded, setShowModalLimitExceeded] = useState(false);
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const onUpload = (file) => {
    if (files.length >= MAX_FILES_LENGTH) return setShowModalLimitExceeded(true);
    dispatch(PreviousReviewFilesActions.uploadFile({ file, colleagueUUID }));
  };
  const filteredFiles = files?.filter(
    ({ fileName }) => !filter || fileName.toLowerCase().includes(filter.toLowerCase()),
  );
  const handleChangeFilter = ({ target }) => setFilteredValue(target.value);
  const deleteFile = (fileUuid) => dispatch(PreviousReviewFilesActions.deleteFile({ fileUuid }));

  useEffect(() => {
    dispatch(PreviousReviewFilesActions.getPreviousReviewFiles());
  }, []);

  return (
    <>
      <Modal
        modalPosition={mobileScreen ? 'bottom' : 'middle'}
        modalContainerRule={[containerRule({ mobileScreen })]}
        title={{ content: '', styles: [modalStyles] }}
        onOverlayClick={onOverlayClick}
      >
        {showModalLimitExceeded && (
          <Modal
            modalPosition={mobileScreen ? 'bottom' : 'middle'}
            modalContainerRule={[containerRule({ mobileScreen })]}
          >
            <div className={css({ marginBottom: '18px', fontSize: '18px' })}>
              <Trans i18nKey='file_limit_exceeded'>File limit exceeded</Trans>
            </div>
            <Button onPress={() => setShowModalLimitExceeded(false)}>
              <Trans i18nKey='close'>Close</Trans>
            </Button>
          </Modal>
        )}
        <Input onChange={handleChangeFilter} />
        <div className={css({ marginTop: '32px' })}>
          <DropZone onUpload={onUpload}>
            <img className={css({ maxWidth: 'inherit' })} src={Upload} alt='Upload' />
            <span className={css(labelStyles)}>{t('Drop file here or click to upload')}</span>
            <span className={css(descriptionStyles)}>{t('Maximum upload size 5MB')}</span>
          </DropZone>
        </div>
        <div className={css(fileListStyles)}>
          {filteredFiles?.map((file) => (
            <File file={file} onDelete={deleteFile} key={file.uuid} />
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
  padding: '24px 38px 24px',
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

const modalStyles = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '24px',
  minHeight: '700px',
} as Styles;

const fileListStyles = { marginTop: '32px', maxHeight: '300px', overflow: 'scroll' } as Styles;

export default PreviousReviewFilesModal;
