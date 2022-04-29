import React, { Dispatch, FC, SetStateAction } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { Radio } from 'components/Form';
import { RadioStatus } from '../ViewFeedback/ViewFeedback';

export const RADIO_WRAPPER = 'radio-wrapper';

type Props = {
  checkedRadio: RadioStatus;
  setCheckedRadio: Dispatch<SetStateAction<RadioStatus>>;
  focus: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
  filterModal: boolean;
};

const RadioBtns: FC<Props> = ({ checkedRadio, setCheckedRadio, focus, setFocus, setFilterModal, filterModal }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  return (
    <div data-test-id={RADIO_WRAPPER} className={css(radioWrapper({ mobileScreen }))}>
      <div className={css({ padding: '0px', cursor: 'pointer' })}>
        <label htmlFor='unread' className={css(flexStyle)}>
          <Radio
            name='unread'
            checked={checkedRadio === RadioStatus.UNREAD}
            id='unread'
            onChange={() => {
              if (filterModal) setFilterModal(() => false);
              setCheckedRadio(RadioStatus.UNREAD);
            }}
          />
          <span className={css(titleStyle)} data-test-id={'tt'}>
            <Trans i18nKey='unread'>Unread</Trans>
          </span>
        </label>
      </div>
      <div className={css({ padding: '0px 10px', cursor: 'pointer' })}>
        <label htmlFor='read' className={css(flexStyle)}>
          <Radio
            name='read'
            id='read'
            checked={checkedRadio === RadioStatus.READ}
            onChange={() => {
              if (filterModal) setFilterModal(() => false);
              if (focus) setFocus(() => false);
              setCheckedRadio(RadioStatus.READ);
            }}
          />
          <span className={css(titleStyle)}>
            <Trans i18nKey='read'>Read</Trans>
          </span>
        </label>
      </div>
    </div>
  );
};

const radioWrapper: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  return {
    display: 'flex',
    gap: '10px',

    ...(mobileScreen && { flexBasis: '816px', marginTop: '24px', marginBottom: '24px' }),
  };
};

const titleStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  padding: '0px 5px',
  letterSpacing: '0px',
});
const flexStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

export default RadioBtns;
