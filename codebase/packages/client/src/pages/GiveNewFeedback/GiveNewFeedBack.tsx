import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import NewFeedback from 'features/GiveFeedBack/NewFeedback';

const GIVE_FEEDBACK = 'give-feedback';

const GiveFeedback: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={GIVE_FEEDBACK}>
      <NewFeedback />
    </div>
  );
};

export default GiveFeedback;
