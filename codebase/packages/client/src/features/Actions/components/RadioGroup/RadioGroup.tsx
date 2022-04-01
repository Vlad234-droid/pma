import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { Radio } from 'components/Form';
import { Trans } from 'components/Translation/Translation';
import { Status } from 'config/enum';

type Props = {
  status: Status;
  setStatus: (value: Status) => void;
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
            id={Status.WAITING_FOR_APPROVAL}
            value={Status.WAITING_FOR_APPROVAL}
            name='status'
            checked={status === Status.WAITING_FOR_APPROVAL}
            onChange={() => setStatus(Status.WAITING_FOR_APPROVAL)}
          />
          <span
            className={css({
              fontSize: '16px',
              lineHeight: '20px',
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
            id={Status.APPROVED}
            value={Status.APPROVED}
            name='status'
            checked={status === Status.APPROVED}
            onChange={() => setStatus(Status.APPROVED)}
          />
          <span
            className={css({
              fontSize: '16px',
              lineHeight: '20px',
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
