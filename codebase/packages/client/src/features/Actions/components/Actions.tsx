import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { colors, fontWeight, useBreakpoints, useStyle } from '@dex-ddl/core';
import {
  colleagueUUIDSelector,
  getManagersMetaSelector,
  getPendingEmployees,
  ManagersActions,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
} from '@pma/store';

import { Trans, useTranslation } from 'components/Translation';
import { Checkbox, Radio } from 'components/Form';
import { ReviewType, Status } from 'config/enum';
import { WidgetObjectiveApproval, WidgetTeamMateObjectives } from 'features/Actions';
import Filters, { getEmployeesSortingOptions, useSearchFilter, useSortFilter } from 'features/Filters';
import useDispatch from 'hooks/useDispatch';

import { filterApprovedFn } from '../utils';
import SuccessModal from './SuccessModal';

export const TEST_ID = 'objectives-pave';

type SelectAllProps = {
  onChange: () => void;
  checked: boolean;
  indeterminate: boolean;
  disabled?: boolean;
};

const SelectAll: FC<SelectAllProps> = ({ onChange, checked, indeterminate, disabled }) => {
  const { css } = useStyle();

  return (
    <label>
      <Checkbox
        disabled={disabled}
        name='selectAll'
        id='selectAll'
        onChange={onChange}
        checked={checked}
        indeterminate={indeterminate}
      />
      <span
        className={css({
          paddingLeft: '16px',
          fontSize: '18px',
          lineHeight: '22px',
          color: colors.tescoBlue,
          fontWeight: fontWeight.bold,
          cursor: 'pointer',
        })}
      >
        Select All
      </span>
    </label>
  );
};

export const Actions = () => {
  const dispatch = useDispatch();
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  const [sortValue, setSortValue] = useSortFilter();
  const [searchValue, setSearchValue] = useSearchFilter();
  const { t } = useTranslation();
  const options = getEmployeesSortingOptions(t);
  const { loaded: reviewsLoaded } = useSelector(reviewsMetaSelector);
  const [reviewSubmitted, setReviewSubmitted] = useState<Status | null>(null);
  const [reviewType, setReviewType] = useState<ReviewType | null>(null);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);

  // @ts-ignore
  const { employeeWithPendingApprovals, employeeWithCompletedApprovals } =
    useSelector((state) => getPendingEmployees(state, searchValue, sortValue), shallowEqual) || {};

  const { loaded } = useSelector(getManagersMetaSelector) || {};
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const [indeterminate, setIndeterminate]: [boolean, (T) => void] = useState(false);
  const [isCheckAll, setIsCheckAll]: [boolean, (T) => void] = useState(false);
  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);
  const [reviewsForApproval, setReviewsForApproval]: [any[], (T) => void] = useState([]);

  const [colleagueOpened, setColleagueOpened] = useState<string>('');

  const [colleagues, setColleagues] = useState(employeeWithPendingApprovals || []);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (reviewSubmitted && reviewsLoaded) {
      setIsOpenSuccessModal(true);
    }
  }, [reviewsLoaded, reviewSubmitted]);

  // disable selectAll, if every colleague has more then one item for approve
  const selectAllDisabled = useMemo(
    () => colleagues.every(({ timeline }) => timeline.filter(filterApprovedFn)?.length > 1),
    [colleagues],
  );

  useEffect(() => {
    if (!loaded && colleagueUuid) dispatch(ManagersActions.getManagers({ colleagueUuid }));
  }, [loaded, colleagueUuid]);

  useEffect(() => {
    setColleagues(pending ? employeeWithPendingApprovals : employeeWithCompletedApprovals);
  }, [pending, employeeWithPendingApprovals, employeeWithCompletedApprovals]);

  useEffect(() => {
    return () => {
      dispatch(ReviewsActions.clearReviewData());
      dispatch(SchemaActions.clearSchemaData());
    };
  }, []);

  //todo: refactor this
  useEffect(() => {
    if (colleagues?.length && checkedItems.length && colleagues?.length > checkedItems.length) {
      setIndeterminate(true);
    } else if (colleagues?.length && checkedItems.length && colleagues?.length === checkedItems.length) {
      setIndeterminate(false);
      setIsCheckAll(true);
    } else if (!colleagues?.length && !checkedItems.length) {
      setIsCheckAll(false);
    } else {
      setIndeterminate(false);
      setIsCheckAll(false);
    }
  }, [checkedItems, colleagues]);

  const handleSelectAll = useCallback(() => {
    setIsCheckAll(!isCheckAll);

    // filter employee with more and less than 1 timeline
    const filteredEmployee = employeeWithPendingApprovals.filter(
      (colleague) => colleague.timeline.filter(filterApprovedFn)?.length === 1,
    );

    const checked = filteredEmployee.map((colleague) => colleague.uuid);

    setCheckedItems(checked);

    if (isCheckAll) {
      setCheckedItems([]);
      setReviewsForApproval([]);
    } else {
      setReviewsForApproval(filteredEmployee);
    }
  }, [isCheckAll, employeeWithPendingApprovals]);

  const handleClick = (e, colleague) => {
    const { id, checked } = e.target;
    setCheckedItems([...checkedItems, id]);
    if (!checked) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
      setReviewsForApproval((prev) => [...prev.filter((item) => item.uuid !== colleague.uuid)]);
    } else {
      setReviewsForApproval((prev) => [...prev, { ...colleague }]);
    }
  };

  const handleCloseSuccessModal = () => {
    setReviewSubmitted(null);
    setReviewType(null);
    setIsOpenSuccessModal(false);
  };

  const handleSubmitReview = (status: Status, type: ReviewType) => {
    setReviewSubmitted(status);
    setReviewType(type);
  };

  return (
    <>
      <div
        className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px' })}
      >
        {!mobileScreen && pending && (
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <SelectAll
              onChange={handleSelectAll}
              checked={isCheckAll}
              indeterminate={indeterminate}
              disabled={selectAllDisabled}
            />
          </div>
        )}
        <div className={css({ display: 'flex' })}>
          <div className={css({ padding: '0px 10px' })}>
            <label
              className={css({
                display: 'flex',
                alignItems: 'center',
              })}
            >
              <Radio id='option1' name='status' checked={pending} onChange={() => setPending(true)} />
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
              <Radio id='option2' name='status' checked={!pending} onChange={() => setPending(false)} />
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
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <Filters
            sortValue={sortValue}
            onSort={setSortValue}
            searchValue={searchValue}
            onSearch={setSearchValue}
            sortingOptions={options}
          />
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap-reverse',
          gridGap: '8px',
          marginTop: '34px',
          alignItems: 'stretch',
        })}
      >
        <div className={css({ flex: '3 1 375px', display: 'flex', flexDirection: 'column', gap: '8px' })}>
          {colleagues?.map((colleague) => {
            const timelineApproved = colleague.timeline.filter(filterApprovedFn);

            return (
              <div key={colleague.uuid} className={css({ display: 'flex', flexWrap: 'wrap' })}>
                <div className={css({ width: '40px', position: 'relative' })}>
                  <span className={css({ position: 'absolute', top: '36px' })}>
                    {pending && (
                      <Checkbox
                        disabled={timelineApproved?.length > 1}
                        id={colleague.uuid}
                        checked={checkedItems.includes(colleague.uuid)}
                        onChange={(e) => handleClick(e, colleague)}
                      />
                    )}
                  </span>
                </div>
                <div className={css({ width: 'calc(100% - 40px)' })}>
                  <WidgetTeamMateObjectives
                    key={colleague.uuid}
                    id={colleague.uuid}
                    status={pending ? Status.WAITING_FOR_APPROVAL : Status.APPROVED}
                    colleague={colleague}
                    onSubmit={handleSubmitReview}
                    colleagueOpened={colleagueOpened}
                    setColleagueOpened={setColleagueOpened}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {mobileScreen && pending && (
          <div
            className={css({
              width: '100%',
              padding: '16px 0',
            })}
          >
            <SelectAll
              onChange={handleSelectAll}
              checked={isCheckAll}
              indeterminate={indeterminate}
              disabled={selectAllDisabled}
            />
          </div>
        )}
        <div
          data-test-id='more'
          className={css({
            flex: '1 0 216px',
          })}
        >
          <div>
            {pending && (
              <WidgetObjectiveApproval
                isDisabled={!checkedItems.length}
                reviewsForApproval={reviewsForApproval}
                onSave={() => setCheckedItems([])}
              />
            )}
          </div>
        </div>
      </div>
      {isOpenSuccessModal && (
        <SuccessModal
          // @ts-ignore
          status={reviewSubmitted as Status}
          review={reviewType as ReviewType}
          onClose={handleCloseSuccessModal}
        />
      )}
    </>
  );
};
