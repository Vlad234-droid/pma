import React, { Dispatch, FC, SetStateAction } from 'react';
import { useStyle, Rule, CreateRule } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { FeedbackStatus } from 'config/enum';

import { Radio } from 'components/Form';

export const RADIO_WRAPPER = 'radio-wrapper';

type RadioBtnsProps = {
  status: string;
  setStatus: Dispatch<SetStateAction<FeedbackStatus>>;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
  filterModal: boolean;
};

const RadioBtns: FC<RadioBtnsProps> = ({ status, setStatus, setFilterModal, filterModal }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  return (
    <div className={css(FlexMobileStyle({ mobileScreen }))} data-test-id={RADIO_WRAPPER}>
      <div className={css({ padding: '0px 10px 0px 0px', cursor: 'pointer' })}>
        <label htmlFor='pending' className={css(FlexCenterStyle)}>
          <Radio
            name='pending'
            checked={status === FeedbackStatus.PENDING}
            id='pending'
            onChange={() => {
              if (filterModal) setFilterModal(() => false);

              setStatus(FeedbackStatus.PENDING);
            }}
          />
          <span className={css(SizeStyle)}>
            <Trans i18nKey='pending'>Pending</Trans>
          </span>
        </label>
      </div>
      <div className={css({ padding: '0px', cursor: 'pointer' })}>
        <label htmlFor='completed' className={css(FlexCenterStyle)}>
          <Radio
            id='completed'
            name='completed'
            checked={status === FeedbackStatus.COMPLETED}
            onChange={() => {
              if (filterModal) setFilterModal(() => false);

              setStatus(FeedbackStatus.COMPLETED);
            }}
          />
          <span className={css(SizeStyle)}>
            <Trans i18nKey='completed'>Completed</Trans>
          </span>
        </label>
      </div>
    </div>
  );
};

const SizeStyle: Rule = {
  fontSize: '16px',
  lineHeight: '20px',
  padding: '0px 5px',
};

const FlexCenterStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const FlexMobileStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  ...(mobileScreen && { flexBasis: '816px', marginTop: '24px', marginBottom: '24px' }),
});

export default RadioBtns;
