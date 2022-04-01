import React, { FC, useEffect, useState } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import { SubmitPartProps } from './type';
import { FeedbackStatus } from 'config/enum';
import { inDayRange } from 'utils/date';

import useSubmittedCompletedNotes from '../../..//hooks/useSubmittedCompletedNotes';
import DraftList from '../../DraftList';
import { defaultSerializer } from '../../DraftItem';

export const WRAPPER = 'part-wrapper';

const SubmitPart: FC<SubmitPartProps> = ({ selectedPerson, searchDate, onChange }) => {
  const { css } = useStyle();
  const [selected, setSelected] = useState<string[]>([]);

  const filterFn = (item) => {
    const fullName =
      `${item?.colleagueProfile?.colleague?.profile?.firstName}${item?.colleagueProfile?.colleague?.profile?.lastName}`.toLowerCase();

    const searchValue = `${selectedPerson?.profile?.firstName}${selectedPerson?.profile?.lastName}`.toLowerCase();

    return fullName.includes(searchValue) && (searchDate ? inDayRange(searchDate, item.createdTime) : true);
  };

  const sortFn = (i1, i2) => {
    const createdTimeGetter = (item) => String(item.createdTime || '');
    const val1 = createdTimeGetter(i1);
    const val2 = createdTimeGetter(i2);

    return val1.localeCompare(val2);
  };

  const submittedCompletedNotes = useSubmittedCompletedNotes({
    status: [FeedbackStatus.SUBMITTED, FeedbackStatus.COMPLETED],
    sortFn,
    filterFn,
    serializer: defaultSerializer,
  });

  useEffect(() => {
    if (submittedCompletedNotes.length >= 0) {
      onChange && onChange(submittedCompletedNotes.filter((item) => selected.includes(item.uuid)));
    }
  }, [selected.length, submittedCompletedNotes.length]);

  return (
    <div data-test-id={WRAPPER}>
      <div className={css({ height: '1px', background: '#E5E5E5' })} />
      <div className={css({ marginTop: '16px' })}>
        <DraftList items={submittedCompletedNotes} downloadable={false} selectable onChange={setSelected as any} />
      </div>
    </div>
  );
};

export default SubmitPart;
