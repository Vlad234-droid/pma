import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { Header } from '../../components/Header';
import { OuterGiveFeedBack } from '../../features/OuterGiveFeedBack';

const GIVE_FEEDBACK = 'give-feedback';

const GiveFeedback: FC = () => {
  const { css } = useStyle();

  return (
    <div className={css({ margin: '22px 42px 0px 40px' })} data-test-id={GIVE_FEEDBACK}>
      <Header title='Give feedback' styles={titleStyle} customSize={true} />
      <OuterGiveFeedBack />
    </div>
  );
};

const titleStyle: Rule = {
  fontSize: '24px',
};

export default GiveFeedback;
