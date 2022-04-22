import React, { useEffect, useState } from 'react';
import { Button, CreateRule, Modal, Rule, useStyle } from '@pma/dex-wrapper';
import { isDeleteFileLoaded, isDeleteFileSuccess, PreviousReviewFilesActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { Trans } from 'react-i18next';
import { useSelector } from 'react-redux';

type Props = {
  fileName: string;
  colleagueUUID: string;
  fileUuid: string;
  onClose: () => void;
};

export const RemoveFileModal: React.FC<Props> = ({ colleagueUUID, fileUuid, onClose, fileName }) => {
  const [deleting, setDeleting] = useState(false);
  const [savedFileName] = useState(fileName);
  const isSuccess = useSelector(isDeleteFileSuccess);
  const isLoaded = useSelector(isDeleteFileLoaded);
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const dispatch = useDispatch();

  const removeFile = () => {
    dispatch(PreviousReviewFilesActions.deleteFile({ fileUuid, colleagueUUID }));
    setDeleting(true);
  };

  useEffect(() => {
    isLoaded && !isSuccess && deleting && onClose();
  }, [deleting, isSuccess, isLoaded]);

  return !(deleting && isSuccess) ? (
    <Modal
      modalPosition={mobileScreen ? 'bottom' : 'middle'}
      modalContainerRule={[containerRule({ mobileScreen }), { height: 'auto' }]}
    >
      <div className={css({ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' })}>
        <Trans>Remove the file</Trans>
      </div>
      <div className={css({ marginBottom: '24px', fontSize: '16px' })}>
        <Trans>Are you sure you want to remove {savedFileName}?</Trans>
      </div>
      <div className={css({ display: 'flex', gap: '8px', width: '100%' })}>
        <Button styles={[buttonStyles]} onPress={onClose} mode='inverse'>
          <Trans>Cancel</Trans>
        </Button>
        <Button isDisabled={deleting} styles={[buttonStyles]} onPress={removeFile}>
          <Trans>Confirm</Trans>
        </Button>
      </div>
    </Modal>
  ) : (
    <Modal
      modalPosition={mobileScreen ? 'bottom' : 'middle'}
      modalContainerRule={[containerRule({ mobileScreen }), { height: 'auto' }]}
    >
      <div className={css({ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' })}>
        <Trans>The file is removed</Trans>
      </div>
      <div className={css({ marginBottom: '24px', fontSize: '16px' })}>
        <Trans>{savedFileName} was removed successfully!</Trans>
      </div>
      <div className={css({ width: '100%', maxWidth: '204px', margin: 'auto' })}>
        <Button styles={[buttonStyles]} onPress={onClose}>
          <Trans>Okay</Trans>
        </Button>
      </div>
    </Modal>
  );
};

const containerRule: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  width: mobileScreen ? '345px' : '500px',
  padding: '24px 40px',
  height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
  marginTop: '70px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});

const buttonStyles: Rule = {
  width: '100%',
  outline: '1px',
  outlineStyle: 'solid',
};
