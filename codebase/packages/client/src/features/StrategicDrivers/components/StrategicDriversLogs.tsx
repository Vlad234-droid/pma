import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CreateRule, Rule, Theme, useStyle } from '@dex-ddl/core';
import useDispatch from 'hooks/useDispatch';
import { OrgObjectiveActions, auditLogsSelector } from '@pma/store';
import HistoryTable from 'components/HistoryTable/HistoryTable';

const StrategicDriversLogs: FC = () => {
  const { css, theme } = useStyle();
  const dispatch = useDispatch();
  const auditLogs = useSelector(auditLogsSelector) || [];

  const [isHistoryOpen, setHistoryOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(OrgObjectiveActions.getOrgAuditLogs({ start: 0, limit: 3 }));
  }, []);

  return (
    <div>
      <div className={css(actions)}>
        <Button onPress={() => setHistoryOpen(!isHistoryOpen)} styles={[historyBtn({ theme })]}>
          History of changes <span className={`${css(arrow)} ${!isHistoryOpen ? css(arrowRight) : css(arrowDown)}`} />
        </Button>
      </div>
      <HistoryTable headers={['Name', 'Action Type', 'Time']} items={auditLogs} isVisible={isHistoryOpen} />
    </div>
  );
};

const historyBtn: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    backgroundColor: 'transparent',
    color: `${theme.colors.tescoBlue}`,
    fontWeight: 'bold',
  };
};

const arrow: Rule = {
  marginLeft: '13.75px',
  border: 'solid',
  borderWidth: '0 1px 1px 0',
  display: 'inline-block',
  padding: '4px',
};

const actions: Rule = {
  display: 'flex',
  width: '100%',
};

const arrowRight: Rule = {
  transform: 'rotate(-45deg)',
};

const arrowDown: Rule = {
  marginTop: '-4px',
  transform: 'rotate(45deg)',
};

export default StrategicDriversLogs;
