import React, { FC } from 'react';
import { useStyle } from '@dex-ddl/core';
import { OuterGiveFeedBack } from '../../features/OuterGiveFeedBack';

const GIVE_FEEDBACK = 'give-feedback';

const GiveFeedback: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={GIVE_FEEDBACK}>
      <OuterGiveFeedBack />
    </div>
  );
};

export default GiveFeedback;
