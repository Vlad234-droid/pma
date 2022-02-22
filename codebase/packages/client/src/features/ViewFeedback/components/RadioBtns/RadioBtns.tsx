import React, { Dispatch, FC, SetStateAction } from 'react';
import { useStyle, useBreakpoints } from '@dex-ddl/core';
import { Trans } from 'components/Translation';
import { Radio } from 'components/Form';

type TypecheckedRadio = {
  unread: boolean;
  read: boolean;
};

type filterFeedbacksType = {
  sort: string;
  search: string;
};

type Props = {
  checkedRadio: TypecheckedRadio;
  setCheckedRadio: Dispatch<SetStateAction<TypecheckedRadio>>;
  focus: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
  filterModal: boolean;
  setFilterFeedbacks: Dispatch<SetStateAction<filterFeedbacksType>>;
};

const RadioBtns: FC<Props> = ({
  checkedRadio,
  setCheckedRadio,
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
    <div
      className={css({
        display: 'flex',
        gap: '10px',

        ...(medium && { flexBasis: '816px', marginTop: '24px', marginBottom: '24px' }),
      })}
    >
      <div className={css({ padding: '0px', cursor: 'pointer' })}>
        <label
          htmlFor='unread'
          className={css({
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <Radio
            name='status'
            checked={checkedRadio.unread}
            id='unread'
            onChange={() => {
              if (filterModal) setFilterModal(() => false);
              setFilterFeedbacks(() => ({ sort: '', search: '' }));
              setCheckedRadio(() => {
                return {
                  unread: true,
                  read: false,
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
            <Trans i18nKey='unread'>Unread</Trans>
          </span>
        </label>
      </div>
      <div className={css({ padding: '0px 10px', cursor: 'pointer' })}>
        <label
          className={css({
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <Radio
            name='status'
            checked={checkedRadio.read}
            onChange={() => {
              if (filterModal) setFilterModal(() => false);
              setFilterFeedbacks(() => ({ sort: '', search: '' }));
              if (focus) setFocus(() => false);
              setCheckedRadio(() => {
                return {
                  unread: false,
                  read: true,
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
            <Trans i18nKey='read'>Read</Trans>
          </span>
        </label>
      </div>
    </div>
  );
};

export default RadioBtns;
