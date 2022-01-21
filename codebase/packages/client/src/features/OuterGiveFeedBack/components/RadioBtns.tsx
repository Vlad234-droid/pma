import React, { FC } from 'react';
import { CreateRule, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Trans } from 'components/Translation';
import { Radio } from 'components/Form';
import { IconButton } from 'components/IconButton';
import { FeedbackStatus } from 'config/enum';

type Props = {
  checkedRadio: FeedbackStatus;
  onCheck: (item: FeedbackStatus) => void;
  handleBtnClick: () => void;
};

const RadioBtns: FC<Props> = ({ checkedRadio, onCheck, handleBtnClick }) => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const medium = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return (
    <>
      <IconButton
        customVariantRules={{ default: iconBtnStyle }}
        onPress={handleBtnClick}
        graphic='add'
        iconProps={{ invertColors: true }}
        iconStyles={iconStyle}
      >
        <Trans>Give new feedback</Trans>
      </IconButton>
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
              <Trans>Drafts</Trans>
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
              <Trans>Shared</Trans>
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

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '12px 20px 12px 22px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
  fontWeight: theme.font.weight.bold,
});

const iconStyle: Rule = {
  marginRight: '10px',
  marginTop: '2px',
};
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
