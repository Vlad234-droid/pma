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
    <div className={css(FlexMobileStyle)}>
      <div className={css({ padding: '0px 10px 0px 0px', cursor: 'pointer' })}>
        <label htmlFor='pending' className={css(FlexCenterStyle)}>
          <Radio
            name='status1'
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
          <span className={css(SizeStyle)}>
            <Trans>Pending</Trans>
          </span>
        </label>
      </div>
      <div className={css({ padding: '0px', cursor: 'pointer' })}>
        <label htmlFor='completed' className={css(FlexCenterStyle)}>
          <Radio
            id='completed'
            name='status2'
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
          <span className={css(SizeStyle)}>
            <Trans>Completed</Trans>
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

const FlexMobileStyle: Rule = () => {
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
