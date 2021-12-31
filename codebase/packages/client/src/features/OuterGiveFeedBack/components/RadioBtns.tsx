import React, { Dispatch, FC, SetStateAction } from 'react';
import { useStyle, useBreakpoints, Rule } from '@dex-ddl/core';
import { Trans } from 'components/Translation';
import { Radio } from 'components/Form';
import { IconButton } from 'components/IconButton';

type filterFeedbacksType = {
  AZ: boolean;
  ZA: boolean;
  newToOld: boolean;
  oldToNew: boolean;
};
type TypecheckedRadio = {
  draft: boolean;
  submitted: boolean;
};
type RadioBtnsProps = {
  checkedRadio: TypecheckedRadio;
  setCheckedRadio: Dispatch<SetStateAction<TypecheckedRadio>>;
  handleBtnClick: () => void;
  focus: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
  filterModal: boolean;
  setFilterFeedbacks: Dispatch<SetStateAction<filterFeedbacksType>>;
};

const RadioBtns: FC<RadioBtnsProps> = ({
  checkedRadio,
  setCheckedRadio,
  handleBtnClick,
  focus,
  setFocus,
  setFilterModal,
  filterModal,
  setFilterFeedbacks,
}) => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const medium = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return (
    <>
      <IconButton
        customVariantRules={{ default: iconBtnStyle }}
        onPress={() => {
          if (filterModal) setFilterModal(() => false);
          if (focus) setFocus(() => false);
          setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));
          handleBtnClick();
        }}
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
              type='radio'
              name='status'
              value='option1'
              checked={checkedRadio.draft}
              id='draft'
              onChange={() => {
                if (filterModal) setFilterModal(() => false);
                setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));
                if (focus) setFocus(() => false);
                setCheckedRadio(() => {
                  return {
                    draft: true,
                    submitted: false,
                  };
                });
              }}
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
              type='radio'
              name='status'
              value='option2'
              checked={checkedRadio.submitted}
              id='submitted'
              onChange={() => {
                if (filterModal) setFilterModal(() => false);
                setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));

                if (focus) setFocus(() => false);
                setCheckedRadio(() => {
                  return {
                    draft: false,
                    submitted: true,
                  };
                });
              }}
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
