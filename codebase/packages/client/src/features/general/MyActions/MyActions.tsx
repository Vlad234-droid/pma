import React, { FC, useEffect, useMemo, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import useDispatch from 'hooks/useDispatch';
// TODO: get SortBy from common type
import { SortBy } from 'features/general/Filters';
import { filterApprovedFn } from './utils';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getManagersMetaSelector,
  ManagersActions,
  ReviewsActions,
  SchemaActions,
  getEmployeesWithReviewStatus,
} from '@pma/store';

import { Status, ReviewType } from 'config/enum';
import Spinner from 'components/Spinner';
import { Checkbox } from 'components/Form';
import ApprovalWidget from './components/ApprovalWidget';
import { SuccessModalProvider } from './context/successModalContext';
import ColleagueAction from './components/ColleagueAction';

type Props = {
  status: Status;
  searchValue: string;
  sortValue: SortBy;
  isCheckedAll: boolean;
};

const MyActions: FC<Props> = ({ status, searchValue, sortValue, isCheckedAll }) => {
  const dispatch = useDispatch();
  const { css } = useStyle();

  const { loaded, loading } = useSelector(getManagersMetaSelector) || {};
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);
  const isWaitingForApprovalStatus = status === Status.WAITING_FOR_APPROVAL;
  const colleagues = useSelector((state) => getEmployeesWithReviewStatus(state, status, searchValue, sortValue));

  const reviewsForApproval = useMemo(
    () => colleagues.filter(({ uuid }) => uuid && checkedItems.includes(uuid)),
    [colleagues, checkedItems],
  );

  useEffect(() => {
    // filter employee with more and less than 1 timeline
    const filteredEmployee = colleagues?.filter(
      (colleague) => colleague?.timeline?.filter(filterApprovedFn)?.length === 1,
    );

    setCheckedItems(isCheckedAll ? filteredEmployee?.map((colleague) => colleague.uuid) : []);
  }, [isCheckedAll]);

  useEffect(() => {
    if (!loaded && colleagueUuid) dispatch(ManagersActions.getManagerReviews({ colleagueUuid }));
  }, [loaded, colleagueUuid]);

  useEffect(() => {
    return () => {
      dispatch(ReviewsActions.clearReviewData());
      dispatch(SchemaActions.clearSchemaData());
    };
  }, []);

  const handleUpdateReview = (reviewType: ReviewType, newData: any) => {
    const { code, ...data } = newData;
    dispatch(
      ReviewsActions.updateReviewStatus({
        pathParams: {
          colleagueUuid: data.colleagueUuid,
          approverUuid: colleagueUuid,
          cycleUuid: 'CURRENT',
          code,
          status: data.status,
        },
        data,
      }),
    );
  };

  const handleSelectItem = (e) => {
    const { id, checked } = e.target;
    if (!checked) {
      setCheckedItems(checkedItems.filter((uuid) => uuid !== id));
      return;
    }
    setCheckedItems([...checkedItems, id]);
  };

  const clearCheckedItems = () => setCheckedItems([]);

  if (loading) return <Spinner fullHeight />;

  return (
    <SuccessModalProvider>
      <div className={css(bodyStyle)}>
        <div className={css(optionWrapperStyle)}>
          <div data-test-id='colleague-list'>
            {colleagues?.map((colleague) => (
              <div
                data-test-id={`colleague-wrapper-${colleague.uuid}`}
                key={colleague.uuid}
                className={css(wrapperStyle)}
              >
                <div className={css(checkboxWrapperStyle)}>
                  {status === Status.WAITING_FOR_APPROVAL && (
                    <div className={css(checkboxPositionStyle)}>
                      <Checkbox
                        disabled={colleague?.timeline?.length > 1}
                        id={colleague.uuid}
                        name={colleague.uuid}
                        checked={checkedItems.includes(colleague.uuid)}
                        onChange={handleSelectItem}
                      />
                    </div>
                  )}
                </div>
                <div className={css(blockStyle)}>
                  <ColleagueAction status={status} colleague={colleague} onUpdate={handleUpdateReview} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {isWaitingForApprovalStatus && (
          <div className={css(rightColumnStyle)}>
            <ApprovalWidget isDisabled={!checkedItems.length} reviews={reviewsForApproval} onSave={clearCheckedItems} />
          </div>
        )}
      </div>
    </SuccessModalProvider>
  );
};

export default MyActions;

const bodyStyle: Rule = {
  display: 'flex',
  flexWrap: 'wrap-reverse',
  gridGap: '8px',
  marginTop: '34px',
  alignItems: 'stretch',
};

const optionWrapperStyle: Rule = { flex: '3 1 375px', display: 'flex', flexDirection: 'column', gap: '8px' };

const rightColumnStyle: Rule = { flex: '1 0 216px' };

const wrapperStyle: Rule = { display: 'flex', flexWrap: 'wrap' };
const checkboxWrapperStyle: Rule = { width: '40px', position: 'relative' };
const checkboxPositionStyle: Rule = { position: 'relative', top: '36px' };
const blockStyle: Rule = { width: 'calc(100% - 40px)' };
