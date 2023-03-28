import { useParams } from 'react-router-dom';
import { isDirectReportSelector, isDirectReportPlusOneSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { role, usePermission } from 'features/general/Permission';

export const usePermissions = () => {
  const { uuid } = useParams<{ uuid: string }>();

  const canLMPerform = usePermission([role.LINE_MANAGER]);
  const isPeopleTeam = usePermission([role.PEOPLE_TEAM]);
  const canTAPerform = usePermission([role.TALENT_ADMIN]);

  const isDirectReport = useSelector(isDirectReportSelector(uuid!));
  const isLineManagerPlusOne = useSelector(isDirectReportPlusOneSelector(uuid!));

  const isLineManager = canLMPerform && (isDirectReport || isLineManagerPlusOne);
  const isTalentAdmin = canTAPerform && !isLineManager && !isPeopleTeam;

  return { isPeopleTeam, isLineManager, isTalentAdmin };
};
