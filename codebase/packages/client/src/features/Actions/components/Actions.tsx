import React, { FC, useEffect, useState } from 'react';
import { colors, fontWeight, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Trans } from 'components/Translation';
import { Checkbox, Radio } from 'components/Form';
import { Status } from 'config/enum';
import { WidgetObjectiveApproval, WidgetTeamMateObjectives } from 'features/Actions';
import { FilterOption } from 'features/Shared';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getManagersMetaSelector,
  getPendingEmployees,
  ManagersActions,
  SchemaActions,
  schemaMetaSelector,
} from '@pma/store';
import useDispatch from 'hooks/useDispatch';

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
        type='checkbox'
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
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);

  const { employeeWithPendingApprovals, employeeWithCompletedApprovals } = useSelector(getPendingEmployees) || {};
  const { loaded } = useSelector(getManagersMetaSelector) || {};
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loaded) dispatch(ManagersActions.getManagers({ colleagueUuid }));
    if (!schemaLoaded) dispatch(SchemaActions.getSchema({ colleagueUuid }));
  }, [loaded, schemaLoaded, colleagueUuid]);

  const [indeterminate, setIndeterminate]: [boolean, (T) => void] = useState(false);
  const [isCheckAll, setIsCheckAll]: [boolean, (T) => void] = useState(false);
  const [isCheck, setIsCheck]: [string[], (T) => void] = useState([]);
  const [reviewsForApproval, setReviewsForApproval]: [any[], (T) => void] = useState([]);
  const [colleagues, setColleagues] = useState(employeeWithPendingApprovals || []);
  const [pending, setPending] = useState(true);
  const [colleagueReviews, setColleagueReviews]: [any, (T) => void] = useState({});

  useEffect(() => {
    setColleagues(pending ? employeeWithPendingApprovals : employeeWithCompletedApprovals);
  }, [pending, employeeWithPendingApprovals, employeeWithCompletedApprovals]);

  //todo: refactor this
  useEffect(() => {
    if (colleagues?.length && isCheck.length && colleagues?.length > isCheck.length) {
      setIndeterminate(true);
    } else if (colleagues?.length && isCheck.length && colleagues?.length === isCheck.length) {
      setIndeterminate(false);
      setIsCheckAll(true);
    } else if (!colleagues?.length && !isCheck.length) {
      setIsCheckAll(false);
    } else {
      setIndeterminate(false);
      setIsCheckAll(false);
    }
  }, [isCheck, colleagues]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    const checkedItems = employeeWithPendingApprovals.map((li) => li.uuid);
    setIsCheck(checkedItems);
    if (isCheckAll) {
      setIsCheck([]);
      setReviewsForApproval([]);
    } else {
      setReviewsForApproval(employeeWithPendingApprovals);
    }
  };

  const handleClick = (e, colleague) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
      setReviewsForApproval((prev) => [...prev.filter((item) => item.uuid !== colleague.uuid)]);
    } else {
      setReviewsForApproval((prev) => [...prev, { ...colleague }]);
    }
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
            <SelectAll onChange={handleSelectAll} checked={isCheckAll} indeterminate={indeterminate} disabled={true} />
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
              <Radio
                id='option1'
                type='radio'
                name='status'
                value='option1'
                checked={pending}
                onChange={() => setPending(true)}
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
                id='option2'
                type='radio'
                name='status'
                value='option2'
                checked={!pending}
                onChange={() => setPending(false)}
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
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <FilterOption />
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
            const timelineApproved = colleague.timeline.filter((tl) => tl.status === Status.WAITING_FOR_APPROVAL);
            return (
              <div key={colleague.uuid} className={css({ display: 'flex', flexWrap: 'wrap' })}>
                <div className={css({ width: '40px', position: 'relative' })}>
                  <span className={css({ position: 'absolute', top: '36px' })}>
                    <Checkbox
                      disabled={timelineApproved?.length > 1}
                      id={colleague.uuid}
                      checked={isCheck.includes(colleague.uuid)}
                      onChange={(e) => handleClick(e, colleague)}
                    />
                  </span>
                </div>
                <div className={css({ width: 'calc(100% - 40px)' })}>
                  <WidgetTeamMateObjectives
                    key={colleague.uuid}
                    id={colleague.uuid}
                    status={pending ? Status.WAITING_FOR_APPROVAL : Status.APPROVED}
                    colleague={colleague}
                    colleagueReviews={colleagueReviews}
                    setColleagueReviews={setColleagueReviews}
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
            <SelectAll onChange={handleSelectAll} checked={isCheckAll} indeterminate={indeterminate} disabled={true} />
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
                canDecline={isCheck.length === 1}
                isDisabled={!isCheck.length}
                reviewsForApproval={reviewsForApproval}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
