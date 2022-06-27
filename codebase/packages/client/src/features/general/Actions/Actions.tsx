import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import useDispatch from 'hooks/useDispatch';
import { Filters, getEmployeesSortingOptions, useSearch, useSorting } from 'features/general/Filters';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getManagersMetaSelector,
  ManagersActions,
  ReviewsActions,
  SchemaActions,
  getEmployeesWithReviewStatus,
} from '@pma/store';

import { Status } from 'config/enum';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';

import { SelectAll } from './components/SelectAll';
import { ApprovalWidget } from './components/Widgets';
import { filterApprovedFn } from './utils';
import { SuccessModal } from './components/Modal';
import { SuccessModalConsumer, SuccessModalProvider } from './context/successModalContext';
import { ColleagueList } from './components/ColleagueList';
import { RadioGroup } from './components/RadioGroup';

export const Actions = () => {
  const dispatch = useDispatch();
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const { t } = useTranslation();

  const options = getEmployeesSortingOptions(t);
  const [sortValue, setSortValue] = useSorting();
  const [searchValue, setSearchValue] = useSearch();

  const { loaded } = useSelector(getManagersMetaSelector) || {};
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const [status, setStatus] = useState<Status>(Status.WAITING_FOR_APPROVAL);
  const isWaitingForApproval = status === Status.WAITING_FOR_APPROVAL;
  const colleagues = useSelector(getEmployeesWithReviewStatus(status)(searchValue, sortValue));

  const [isCheckAll, setIsCheckAll]: [boolean, (T) => void] = useState(false);
  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);

  const handleSelectItem = (e) => {
    const { id, checked } = e.target;
    setCheckedItems([...checkedItems, id]);
    if (!checked) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    }
  };
  const handleSelectAll = useCallback(() => {
    // filter employee with more and less than 1 timeline
    const filteredEmployee = colleagues?.filter(
      (colleague) => colleague?.timeline?.filter(filterApprovedFn)?.length === 1,
    );

    setCheckedItems(!isCheckAll ? filteredEmployee?.map((colleague) => colleague.uuid) : []);
    setIsCheckAll(!isCheckAll);
  }, [isCheckAll, colleagues]);

  // disable selectAll, if every colleague has more then one item for approve
  const selectAllDisabled = useMemo(
    () => colleagues.every(({ timeline = [] }) => timeline?.filter(filterApprovedFn)?.length > 1),
    [colleagues],
  );
  const reviewsForApproval = useMemo(
    () => colleagues.filter(({ uuid }) => uuid && checkedItems.includes(uuid)),
    [colleagues, checkedItems],
  );
  const indeterminate = checkedItems.length > 0 && !isCheckAll;

  useEffect(() => {
    if (!loaded && colleagueUuid) dispatch(ManagersActions.getManagers({ colleagueUuid }));
  }, [loaded, colleagueUuid]);

  useEffect(() => {
    return () => {
      dispatch(ReviewsActions.clearReviewData());
      dispatch(SchemaActions.clearSchemaData());
    };
  }, []);

  useEffect(() => {
    const filteredEmployee = colleagues.filter(
      (colleague) => colleague?.timeline?.filter(filterApprovedFn)?.length === 1,
    );
    if (checkedItems.length && filteredEmployee?.length === checkedItems.length) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  }, [checkedItems, colleagues]);

  return (
    <>
      <SuccessModalProvider>
        {loaded ? (
          <>
            <div className={css(headStyle)}>
              {!mobileScreen && isWaitingForApproval && (
                <SelectAll
                  disabled={selectAllDisabled}
                  onChange={handleSelectAll}
                  checked={isCheckAll}
                  indeterminate={indeterminate}
                />
              )}
              <RadioGroup status={status} setStatus={setStatus} />
              <div className={css(filtersStyle)}>
                <Filters
                  sortValue={sortValue}
                  onSort={setSortValue}
                  searchValue={searchValue}
                  onSearch={setSearchValue}
                  sortingOptions={options}
                />
              </div>
            </div>
            <div className={css(bodyStyle)}>
              <div className={css(optionWrapperStyle)}>
                <ColleagueList
                  status={status}
                  checkedItems={checkedItems}
                  colleagues={colleagues}
                  handleSelectItem={handleSelectItem}
                />
              </div>
              {mobileScreen && isWaitingForApproval && (
                <div className={css(selectAllMobileStyle)}>
                  <SelectAll
                    disabled={selectAllDisabled}
                    onChange={handleSelectAll}
                    checked={isCheckAll}
                    indeterminate={indeterminate}
                  />
                </div>
              )}
              {isWaitingForApproval && (
                <div className={css(rightColumnStyle)}>
                  <ApprovalWidget
                    isDisabled={!checkedItems.length}
                    reviews={reviewsForApproval}
                    onSave={() => setCheckedItems([])}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <Spinner fullHeight />
        )}
        <SuccessModalConsumer>
          {({ isOpen, setOpened, reviewStatus, reviewType, setReviewStatus, setReviewType }) => {
            if (isOpen && reviewStatus && reviewType) {
              return (
                <SuccessModal
                  review={reviewType}
                  status={reviewStatus as Status.DECLINED | Status.APPROVED}
                  onClose={() => {
                    setOpened(false);
                    setReviewStatus(null);
                    setReviewType(null);
                  }}
                />
              );
            }
            return null;
          }}
        </SuccessModalConsumer>
      </SuccessModalProvider>
    </>
  );
};

const headStyle: Rule = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px' };

const bodyStyle: Rule = {
  display: 'flex',
  flexWrap: 'wrap-reverse',
  gridGap: '8px',
  marginTop: '34px',
  alignItems: 'stretch',
};

const filtersStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const optionWrapperStyle: Rule = { flex: '3 1 375px', display: 'flex', flexDirection: 'column', gap: '8px' };

const selectAllMobileStyle: Rule = {
  width: '100%',
  padding: '16px 0',
};

const rightColumnStyle: Rule = { flex: '1 0 216px' };
