import React, { useEffect } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';
import {
  OrgObjectiveActions,
  orgObjectivesSelector,
  orgObjectivesMetaSelector,
  colleagueCycleYearSelector,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import Spinner from 'components/Spinner';
import Popup from 'components/Popup/Popup';

export const TEST_ID = 'objectives-view-test-id';
export const SPINNER_ID = 'spinner-id';

const ObjectivesView = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();

  const orgObjectives = useSelector(orgObjectivesSelector) || [];
  const { loaded } = useSelector(orgObjectivesMetaSelector);
  const cycleYear = useSelector(colleagueCycleYearSelector);

  useEffect(() => {
    dispatch(OrgObjectiveActions.getOrgPublishedObjectives({ year: cycleYear }));
  }, [cycleYear]);

  if (!loaded) {
    return <Spinner data-test-id={SPINNER_ID} fullHeight />;
  }

  return (
    <div data-test-id={TEST_ID} className={css(main)}>
      <Popup items={orgObjectives} />
    </div>
  );
};

const main: Rule = {
  height: 'inherit',
  backgroundColor: '#00539F',
  overflow: 'auto',
};

export default ObjectivesView;
