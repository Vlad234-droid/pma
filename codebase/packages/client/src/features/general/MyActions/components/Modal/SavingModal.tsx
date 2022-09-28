import React, { FC } from 'react';
import { useStyle, CreateRule, Modal } from '@pma/dex-wrapper';
import Spinner from 'components/Spinner';

export type Props = {};

const SavingModal: FC<Props> = () => {
  const { matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <Modal modalPosition={'middle'} modalContainerRule={[containerRule({ mobileScreen })]}>
      <Spinner text={'Saving...'} />
    </Modal>
  );
};

const containerRule: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  width: mobileScreen ? '345px' : '500px',
  padding: '24px 38px 24px',
});

export default SavingModal;
