import { Condition, ConditionOperandEnum, ColleagueFilterOptions, CalibrationColleague } from '@pma/openapi';
import { ActionType, CalibrationSessionUiType } from '../types';
import { filterMap, filterToRequest } from 'utils';

export const filterFromSessionResponse = (filter: Condition[]) =>
  filter.reduce((acc, val) => {
    if (Array.isArray(val.value) && val.property) {
      acc[filterMap[val.property] || val.property] = val.value.reduce((acc, val) => {
        acc[val] = true;
        return acc;
      }, {});
    } else if (typeof val.value === 'string' && val.property) {
      acc[filterMap[val.property] || val.property] = val?.value ? { [val.value]: true } : {};
    }
    return acc;
  }, {});

export const prepareFormData = (data: CalibrationSessionUiType) => {
  const { colleaguesAdd = [], colleaguesRemoved = [], filter = {}, ...rest } = data;
  const filterToData = filterToRequest(filter);

  const participants = {
    ...(colleaguesAdd.length
      ? {
          'colleague-uuid_in': colleaguesAdd
            .filter((colleague) => !!colleague?.['value'])
            .map((colleague) => colleague?.['value']),
        }
      : {}),
    ...(colleaguesRemoved.length
      ? {
          'colleague-uuid_nin': colleaguesRemoved
            .filter((colleague) => !!colleague?.['value'])
            .map((colleague) => colleague?.['value']),
        }
      : {}),
    ...filterToData,
  };

  return {
    ...rest,
    ...(rest.startTime ? { startTime: new Date(rest.startTime).toISOString() } : {}),
    participants,
  };
};

export const prepareColleaguesForUI = (
  calibrationColleague: CalibrationColleague[],
  filters: Condition[],
  operand: ConditionOperandEnum.In | ConditionOperandEnum.NotIn,
) => {
  const colleaguesAddIds =
    (filters.find((f) => f?.property && ['colleague-uuid'].includes(f?.property) && f.operand === operand)
      ?.value as string[]) || [];

  return calibrationColleague
    .filter((c) => c.colleague && c.colleague.uuid && colleaguesAddIds.includes(c.colleague.uuid))
    .map(({ colleague }) => ({
      value: colleague?.uuid,
      label: `${colleague?.firstName} ${colleague?.lastName}`,
      type: operand === ConditionOperandEnum.In ? ActionType.ADD : ActionType.REMOVE,
    }));
};

export const getSelectedGroups = (colleagueFilter: ColleagueFilterOptions, filter): string[] => {
  const acc: string[] = [];
  for (const [key, value] of Object.entries(colleagueFilter)) {
    const valueIds = value?.map((v) => (v.uuid ? v.uuid : v.code));
    const filterKeys = filter?.[key];
    if (key && Object.keys(filterKeys || {}).some((fk) => valueIds.includes(fk) && filterKeys[fk] === true)) {
      acc.push(key);
    }
  }
  return acc;
};
