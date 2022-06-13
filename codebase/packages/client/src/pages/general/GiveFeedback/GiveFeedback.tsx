import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { GiveFeedBack } from 'features/general/GiveFeedBack';

const GIVE_FEEDBACK = 'give-feedback';

const GiveFeedback: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={GIVE_FEEDBACK}>
      <GiveFeedBack />
    </div>
  );
};

export default GiveFeedback;
