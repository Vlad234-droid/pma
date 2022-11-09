import React, { FC, useEffect, useMemo, useState } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import useDispatch from 'hooks/useDispatch';
// TODO: get SortBy from common type
import { SortBy } from 'features/general/Filters';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getEmployeesWithReviewStatuses,
  ManagersActions,
  ReviewsActions,
  SchemaActions,
} from '@pma/store';

import { ActionStatus, Status } from 'config/enum';
import { Checkbox } from 'components/Form';
import ApprovalWidget from './components/ApprovalWidget';
import { SuccessModalProvider } from './context/successModalContext';
import ColleagueAction from './components/ColleagueAction';
import { SuccessModal } from './components/Modal';

type Props = {
  status: ActionStatus;
  searchValue: string;
  sortValue: SortBy;
  isCheckedAll: boolean;
};

const MyActions: FC<Props> = ({ status, searchValue, sortValue, isCheckedAll }) => {
  const dispatch = useDispatch();
  const { css } = useStyle();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);
  const isPending = status === ActionStatus.PENDING;
  const reviewStatuses = isPending
    ? [Status.WAITING_FOR_APPROVAL, Status.WAITING_FOR_COMPLETION]
    : [Status.COMPLETED, Status.APPROVED, Status.DECLINED];
  const colleagueCycleStatuses = isPending
    ? [Status.STARTED, Status.FINISHED, Status.FINISHING]
    : [Status.STARTED, Status.FINISHED, Status.FINISHING, Status.COMPLETED];

  const colleagues = useSelector((state) => getEmployeesWithReviewStatuses(state, status, searchValue, sortValue));

  const reviewsForApproval = useMemo(
    () => colleagues.filter(({ uuid }) => uuid && checkedItems.includes(uuid)),
    [colleagues, checkedItems],
  );

  useEffect(() => {
    setCheckedItems(isCheckedAll ? colleagues?.map((colleague: any) => colleague?.uuid) : []);
  }, [isCheckedAll]);

  useEffect(() => {
    if (colleagueUuid)
      dispatch(ManagersActions.getManagerReviews({ colleagueUuid, reviewStatuses, colleagueCycleStatuses, status }));
  }, [colleagueUuid, status]);

  useEffect(() => {
    return () => {
      dispatch(ReviewsActions.clearReviewData());
      dispatch(SchemaActions.clearSchemaData());
    };
  }, []);

  const handleUpdateReview = (reviewType: string, newData: any) => {
    const { code, cycleUuid, ...data } = newData;
    dispatch(
      ReviewsActions.updateReviewStatus({
        pathParams: {
          colleagueUuid: data.colleagueUuid,
          approverUuid: colleagueUuid,
          cycleUuid,
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

  return (
    <SuccessModalProvider>
      {({ isOpen, statusHistory, setOpened }) => {
        return (
          <>
            <div className={css(bodyStyle)}>
              <div className={css(optionWrapperStyle)}>
                {colleagues?.map((colleague: any) => (
                  <div key={colleague.uuid} className={css(wrapperStyle)}>
                    <div className={css(checkboxWrapperStyle)}>
                      {status === ActionStatus.PENDING && (
                        <div className={css(checkboxPositionStyle)}>
                          <Checkbox
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
              {isPending && (
                <div className={css(rightColumnStyle)}>
                  <ApprovalWidget
                    isDisabled={!checkedItems.length}
                    reviews={reviewsForApproval}
                    onSave={clearCheckedItems}
                  />
                </div>
              )}
            </div>
            {isOpen && statusHistory && (
              <SuccessModal isOpen={isOpen} statusHistory={statusHistory} setOpened={setOpened} />
            )}
          </>
        );
      }}
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

const optionWrapperStyle: Rule = { flex: '3 1 500px', display: 'flex', flexDirection: 'column', gap: '8px' };

const rightColumnStyle: Rule = { flex: '1 0 290px' };

const wrapperStyle: Rule = {
  display: 'flex',
  flexWrap: 'wrap',
  '&:not(:first-child)': {
    marginTop: '4px',
  },
} as Styles;
const checkboxWrapperStyle: Rule = { width: '40px', position: 'relative' };
const checkboxPositionStyle: Rule = { position: 'relative', top: '36px' };
const blockStyle: Rule = { width: 'calc(100% - 40px)' };
