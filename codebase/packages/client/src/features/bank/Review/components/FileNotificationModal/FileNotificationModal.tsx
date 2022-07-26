import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { useStyle, Button, Modal, CreateRule } from '@pma/dex-wrapper';

type Props = {
  show: boolean;
  text: string;
  handleClose: () => void;
};

export const FileNotificationModal: FC<Props> = ({ show, text, handleClose }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  if (!show) return null;

  return (
    <Modal
      modalPosition={mobileScreen ? 'bottom' : 'middle'}
      modalContainerRule={[containerRule({ mobileScreen }), { height: 'auto' }]}
    >
      <div className={css({ marginBottom: '18px', fontSize: '18px' })}>{text}</div>
      <Button onPress={handleClose}>
        <Trans i18nKey='close'>Close</Trans>
      </Button>
    </Modal>
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
