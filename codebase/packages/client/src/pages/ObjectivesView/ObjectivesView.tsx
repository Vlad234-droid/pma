import React, { useEffect } from 'react';
import Popup from 'components/Popup/Popup';
import { useStyle, Rule } from '@dex-ddl/core';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import { OrgObjectiveActions, orgObjectivesSelector } from '@pma/store';

const ObjectivesView = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();

  const orgObjectives = useSelector(orgObjectivesSelector) || [];

  useEffect(() => {
    dispatch(OrgObjectiveActions.getOrgObjectives({}));
  }, []);

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
