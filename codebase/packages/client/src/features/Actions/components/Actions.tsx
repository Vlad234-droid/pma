import React, { useEffect, useState } from 'react';
import { colors, fontWeight, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Trans } from 'components/Translation';
import { Checkbox, Radio } from 'components/Form';
import { Status } from 'config/enum';
import { WidgetObjectiveApproval, WidgetTeamMateObjectives } from 'features/Actions';
import { FilterOption } from 'features/Shared';
import { useSelector } from 'react-redux';
import { getManagersMetaSelector, getPendingEmployees, ManagersActions } from '@pma/store';
import useDispatch from '../../../hooks/useDispatch';

export const TEST_ID = 'objectives-pave';

const colleagues: { id: string }[] = [
  {
    id: '1',
  },
  {
    id: '2',
  },
];

const SelectAll = ({ onChange, checked, indeterminate }) => {
  const { css } = useStyle();
  return (
    <label>
      <Checkbox
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

  const { employeeWithPendingApprovals, employeeWithDraftApprovals } = useSelector(getPendingEmployees) || {};
  const { loaded, error } = useSelector(getManagersMetaSelector) || {};
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loaded) dispatch(ManagersActions.getManagers());
  }, [loaded]);

  const [indeterminate, setIndeterminate]: [boolean, (T) => void] = useState(false);
  const [isCheckAll, setIsCheckAll]: [boolean, (T) => void] = useState(false);
  const [isCheck, setIsCheck]: [string[], (T) => void] = useState([]);
  const [reviewsForApproval, setReviewsForApproval]: [any[], (T) => void] = useState([]);

  useEffect(() => {
    if (colleagues.length && isCheck.length && colleagues.length > isCheck.length) {
      setIndeterminate(true);
    } else if (colleagues.length && isCheck.length && colleagues.length === isCheck.length) {
      setIndeterminate(false);
      setIsCheckAll(true);
    } else if (!colleagues.length && !isCheck.length) {
      setIsCheckAll(false);
    } else {
      setIndeterminate(false);
      setIsCheckAll(false);
    }
  }, [isCheck, colleagues]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    const checkedItems = colleagues.map((li) => li.id);
    setIsCheck(checkedItems);
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e, colleague) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
    setReviewsForApproval((prev) => [...prev, { ...colleague }]);
  };

  return (
    <>
      <div
        className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px' })}
      >
        {!mobileScreen && (
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <SelectAll onChange={handleSelectAll} checked={isCheckAll} indeterminate={indeterminate} />
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
              <Radio type='radio' name='status' value='option1' checked={true} />
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
              <Radio type='radio' name='status' value='option2' />
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
          {employeeWithPendingApprovals?.map((colleague) => {
            return (
              <div
                key={colleague.uuid}
                className={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                })}
              >
                <div
                  className={css({
                    width: '40px',
                    position: 'relative',
                  })}
                >
                  <span
                    className={css({
                      position: 'absolute',
                      top: '36px',
                    })}
                  >
                    <Checkbox
                      id={colleague.uuid}
                      checked={isCheck.includes(colleague.uuid)}
                      onChange={(e) => handleClick(e, colleague)}
                    />
                  </span>
                </div>
                <div
                  className={css({
                    width: 'calc(100% - 40px)',
                  })}
                >
                  <WidgetTeamMateObjectives id={colleague.uuid} status={Status.PENDING} colleague={colleague} />
                </div>
              </div>
            );
          })}
        </div>
        {mobileScreen && (
          <div
            className={css({
              width: '100%',
              padding: '16px 0',
            })}
          >
            <SelectAll onChange={handleSelectAll} checked={isCheckAll} indeterminate={indeterminate} />
          </div>
        )}
        <div
          data-test-id='more'
          className={css({
            flex: '1 0 216px',
          })}
        >
          <div>
            <WidgetObjectiveApproval isDisabled={!isCheck.length} reviewsForApproval={reviewsForApproval} />
          </div>
        </div>
      </div>
    </>
  );
};
