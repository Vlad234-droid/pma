import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { Radio } from 'components/Form';
import { Trans } from 'components/Translation/Translation';
import { ActionStatus } from 'config/enum';

type Props = {
  status: ActionStatus;
  setStatus: (value: ActionStatus) => void;
};

export const RadioGroup: FC<Props> = ({ status, setStatus }) => {
  const { css } = useStyle();
  return (
    <div data-test-id='radio-group' className={css({ display: 'flex' })}>
      <div className={css({ padding: '0px 10px' })}>
        <label
          className={css({
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <Radio
            id={ActionStatus.PENDING}
            value={ActionStatus.PENDING}
            name='status'
            checked={status === ActionStatus.PENDING}
            onChange={() => setStatus(ActionStatus.PENDING)}
          />
          <span
            className={css({
              fontSize: '16px',
              lineHeight: '20px',
              letterSpacing: '0px',
              padding: '0px 5px',
            })}
          >
            <Trans i18nKey='pending'>Pending</Trans>
          </span>
        </label>
      </div>
      <div className={css({ padding: '0px 10px' })}>
        <label
          className={css({
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <Radio
            id={ActionStatus.COMPLETED}
            value={ActionStatus.COMPLETED}
            name='status'
            checked={status === ActionStatus.COMPLETED}
            onChange={() => setStatus(ActionStatus.COMPLETED)}
          />
          <span
            className={css({
              fontSize: '16px',
              lineHeight: '20px',
              letterSpacing: '0px',
              padding: '0px 5px',
            })}
          >
            <Trans i18nKey='complete'>Complete</Trans>
          </span>
        </label>
      </div>
    </div>
  );
};
