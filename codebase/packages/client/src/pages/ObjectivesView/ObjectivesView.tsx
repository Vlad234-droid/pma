import React, { useEffect } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { useSelector } from 'react-redux';
import { OrgObjectiveActions, orgObjectivesSelector, orgObjectivesMetaSelector } from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import Spinner from 'components/Spinner';
import Popup from 'components/Popup/Popup';

const ObjectivesView = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();

  const orgObjectives = useSelector(orgObjectivesSelector) || [];
  const { loading, loaded } = useSelector(orgObjectivesMetaSelector);

  useEffect(() => {
    dispatch(OrgObjectiveActions.getOrgObjectives({}));
  }, []);

  if (loading || !loaded) {
    return (
      <Spinner withText fullHeight />
    )
  }

  return (
    <div className={css(main)}>
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
