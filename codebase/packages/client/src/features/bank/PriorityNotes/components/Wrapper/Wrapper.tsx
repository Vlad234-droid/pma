import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import { WrapperModal } from 'features/general/Modal';

const MODAL_WRAPPER = 'modal-wrapper';

type Props = {
  title: string;
  onClose: () => void;
};

export const Wrapper: FC<Props> = ({ children, title, onClose }) => {
  const { css } = useStyle();

  return (
    <WrapperModal onClose={onClose} title={title}>
      <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={MODAL_WRAPPER}>
        {children}
        <ArrowLeftIcon onClick={onClose} data-test-id='arrowRight' />
      </div>
    </WrapperModal>
  );
};

const WrapperModalGiveFeedbackStyle: Rule = {
  paddingLeft: '40px',
  paddingRight: '40px',
  height: '100%',
  overflow: 'auto',
};
