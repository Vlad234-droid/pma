import React, { FC } from 'react';
import { CreateRule, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Trans } from 'components/Translation';
import { Radio } from 'components/Form';
import { FeedbackStatus } from 'config/enum';
import IconButtonDefault from 'components/IconButtonDefault';

type Props = {
  checkedRadio: string;
  onCheck: (item: FeedbackStatus) => void;
  handleBtnClick: () => void;
};

const RadioBtns: FC<Props> = ({ checkedRadio, onCheck, handleBtnClick }) => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const medium = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return (
    <>
      <IconButtonDefault graphic='arrowRight' onClick={handleBtnClick} />
      <div className={css(wrapperBlock({ medium }))}>
        <div className={css({ padding: '0px 10px 0px 0px', cursor: 'pointer' })}>
          <label htmlFor='draft' className={css(flexStyle)}>
            <Radio
              name='status'
              checked={checkedRadio === FeedbackStatus.DRAFT}
              id='draft'
              onChange={() => onCheck(FeedbackStatus.DRAFT)}
            />
            <span className={css(titleStyle)}>
              <Trans i18nKey='drafts'>Drafts</Trans>
            </span>
          </label>
        </div>
        <div className={css({ padding: '0px 10px', cursor: 'pointer' })}>
          <label htmlFor='submitted' className={css(flexStyle)}>
            <Radio
              name='status'
              checked={checkedRadio === FeedbackStatus.SUBMITTED}
              id='draft'
              onChange={() => onCheck(FeedbackStatus.SUBMITTED)}
            />
            <span className={css(titleStyle)}>
              <Trans i18nKey='shared'>Shared</Trans>
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

const wrapperBlock: CreateRule<{ medium: boolean }> = ({ medium }) => ({
  display: 'flex',
  order: medium ? 1 : 0,
  gap: '10px',
  width: '300px',
  ...(medium && { flexBasis: '816px', marginTop: '24px' }),
});

const titleStyle: Rule = {
  fontSize: '16px',
  lineHeight: '20px',
  padding: '0px 10px',
};
const flexStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

export default RadioBtns;
