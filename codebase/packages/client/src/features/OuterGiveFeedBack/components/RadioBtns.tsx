import React, { FC } from 'react';
import { Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
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
      <div
        className={css({
          display: 'flex',
          order: medium ? 1 : 0,
          gap: '10px',
          ...(medium && { flexBasis: '816px', marginTop: '24px' }),
        })}
      >
        <div className={css({ padding: '0px 10px 0px 0px', cursor: 'pointer' })}>
          <label
            htmlFor='draft'
            className={css({
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            })}
          >
            <Radio
              name='status'
              checked={checkedRadio === FeedbackStatus.DRAFT}
              id='draft'
              onChange={() => onCheck(FeedbackStatus.DRAFT)}
            />
            <span
              className={css({
                fontSize: '16px',
                lineHeight: '20px',
                padding: '0px 5px',
              })}
            >
              <Trans>Drafts</Trans>
            </span>
          </label>
        </div>
        <div className={css({ padding: '0px 10px', cursor: 'pointer' })}>
          <label
            htmlFor='submitted'
            className={css({
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            })}
          >
            <Radio
              name='status'
              checked={checkedRadio === FeedbackStatus.SUBMITTED}
              id='draft'
              onChange={() => onCheck(FeedbackStatus.SUBMITTED)}
            />
            <span
              className={css({
                fontSize: '16px',
                lineHeight: '20px',
                padding: '0px 5px',
              })}
            >
              <Trans>Shared</Trans>
            </span>
          </label>
        </div>
      </div>
    </>
  );
};
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
});

const iconStyle: Rule = {
  marginRight: '10px',
};

export default RadioBtns;
