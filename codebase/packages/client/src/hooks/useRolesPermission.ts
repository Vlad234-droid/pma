import { useParams } from 'react-router-dom';
import { isDirectReportSelector, isDirectReportPlusOneSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { role, usePermission } from 'features/general/Permission';

export const useRolesPermission = (uuid = '') => {
  const { uuid: colleagueUuid } = useParams<{ uuid: string }>();

  const canLMPerform = usePermission([role.LINE_MANAGER]);
  const isPeopleTeam = usePermission([role.PEOPLE_TEAM]);
  const canTAPerform = usePermission([role.TALENT_ADMIN]);
  const canPManagerPerform = usePermission([role.PROCESS_MANAGER]);
  const canAdminPerform = usePermission([role.ADMIN]);
  const canExecutivePerform = usePermission([role.EXECUTIVE]);

  const isDirectReport = useSelector(isDirectReportSelector(colleagueUuid || uuid!));
  const isLineManagerPlusOne = useSelector(isDirectReportPlusOneSelector(colleagueUuid || uuid!));

  const isLineManager = canLMPerform && (isDirectReport || isLineManagerPlusOne);
  const isTalentAdmin = canTAPerform && !isLineManager && !isPeopleTeam;

  return { isPeopleTeam, isLineManager, isTalentAdmin, canPManagerPerform, canAdminPerform, canExecutivePerform };
};
