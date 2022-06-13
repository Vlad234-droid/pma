import React, { FC } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { Radio } from 'components/Form';
import { FeedbackStatus } from 'config/enum';
import IconButtonDefault from 'components/IconButtonDefault';

export const RADIO_WRAPPER = 'radio-wrapper';

type Props = {
  checkedRadio: string;
  onCheck: (item: FeedbackStatus) => void;
  handleBtnClick: () => void;
};

const RadioBtns: FC<Props> = ({ checkedRadio, onCheck, handleBtnClick }) => {
  const { css, matchMedia } = useStyle();
  const medium = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  return (
    <>
      <IconButtonDefault graphic='arrowRight' onClick={handleBtnClick} />
      <div className={css(wrapperBlock({ medium }))} data-test-id={RADIO_WRAPPER}>
        <div className={css({ padding: '0px 10px 0px 0px', cursor: 'pointer' })}>
          <label htmlFor='draft' className={css(flexStyle)}>
            <Radio
              name='draft'
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
              name='submitted'
              checked={checkedRadio === FeedbackStatus.SUBMITTED}
              id='submitted'
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

const titleStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  padding: '0px 10px',
});
const flexStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

export default RadioBtns;
