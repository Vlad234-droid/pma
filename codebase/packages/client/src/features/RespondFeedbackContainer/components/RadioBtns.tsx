import React, { Dispatch, FC, SetStateAction } from 'react';
import { useStyle, useBreakpoints, Rule } from '@dex-ddl/core';
import { Trans } from 'components/Translation';

import { Radio } from 'components/Form';

type filterFeedbacksType = {
  AZ: boolean;
  ZA: boolean;
  newToOld: boolean;
  oldToNew: boolean;
};
type TypecheckedRadio = {
  pending: boolean;
  completed: boolean;
};
type RadioBtnsProps = {
  checkedRadio: TypecheckedRadio;
  setCheckedRadio: Dispatch<SetStateAction<TypecheckedRadio>>;
  focus: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
  filterModal: boolean;
  setFilterFeedbacks: Dispatch<SetStateAction<filterFeedbacksType>>;
};

const RadioBtns: FC<RadioBtnsProps> = ({
  checkedRadio,
  setCheckedRadio,
  focus,
  setFocus,
  setFilterModal,
  filterModal,
  setFilterFeedbacks,
}) => {
  const { css } = useStyle();

  return (
    <div className={css(Flex_mobile_style)}>
      <div className={css({ padding: '0px 10px 0px 0px', cursor: 'pointer' })}>
        <label htmlFor='pending' className={css(Flex_center_style)}>
          <Radio
            type='radio'
            name='status1'
            value='option1'
            checked={checkedRadio.pending}
            id='pending'
            onChange={() => {
              if (filterModal) setFilterModal(() => false);
              setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));
              if (focus) setFocus(() => false);
              setCheckedRadio(() => {
                return {
                  pending: true,
                  completed: false,
                };
              });
            }}
          />
          <span className={css(Size_style)}>
            <Trans>Pending</Trans>
          </span>
        </label>
      </div>
      <div className={css({ padding: '0px', cursor: 'pointer' })}>
        <label htmlFor='completed' className={css(Flex_center_style)}>
          <Radio
            id='completed'
            type='radio'
            name='status2'
            value='option2'
            checked={checkedRadio.completed}
            onChange={() => {
              if (filterModal) setFilterModal(() => false);
              setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));
              if (focus) setFocus(() => false);
              setCheckedRadio(() => {
                return {
                  pending: false,
                  completed: true,
                };
              });
            }}
          />
          <span className={css(Size_style)}>
            <Trans>Completed</Trans>
          </span>
        </label>
      </div>
    </div>
  );
};

const Size_style: Rule = {
  fontSize: '16px',
  lineHeight: '20px',
  padding: '0px 5px',
};

const Flex_center_style: Rule = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const Flex_mobile_style: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const medium = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    ...(medium && { flexBasis: '816px', marginTop: '24px', marginBottom: '24px' }),
  };
};

export default RadioBtns;
