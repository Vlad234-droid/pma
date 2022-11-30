import { Condition, ConditionOperandEnum, ColleagueSimple } from '@pma/openapi';
import { Operand } from 'config/enum';
import { CalibrationSessionUiType } from '../types';

export const filterMap = {
  'department-uuid': 'departments',
  'legal-entity-uuid': 'legal-entities',
  'line-manager-uuid': 'line-managers',
  'function-uuid': 'functions',
  'business-group-uuid': 'business-groups',
  'country-code': 'countries',
  'work-level': 'work-levels',
};

export const filterMapRevers = Object.fromEntries(Object.entries(filterMap).map((a) => a.reverse()));

export const filterToRequest = (filter) =>
  Object.entries(filter).reduce((acc, [key, val]) => {
    if (!filterMapRevers[key]) {
      throw new Error('Filter key not exist');
    }

    if (typeof val === 'object') {
      const keys = Object.entries(val || {})
        .filter(([, value]) => !!value)
        .map(([key]) => key);
      if (keys.length) {
        return { ...acc, [`${filterMapRevers[key]}${Operand.IN}`]: keys };
      }
      return acc;
    } else {
      return { ...acc, [`${filterMapRevers[key]}${Operand.IN}`]: val };
    }
  }, {});

export const filterFromSessionResponse = (filter: Condition[]) =>
  filter.reduce((acc, val) => {
    if (Array.isArray(val.value) && val.property) {
      acc[filterMap[val.property]] = val.value.reduce((acc, val) => {
        acc[val] = true;
        return acc;
      }, {});
    } else if (typeof val.value === 'string' && val.property) {
      acc[filterMap[val.property]] = val?.value ? { [val.value]: true } : {};
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
  colleagueSimple: ColleagueSimple[],
  filters: Condition[],
  operand: ConditionOperandEnum.In | ConditionOperandEnum.NotIn,
) => {
  const colleaguesAddIds =
    (filters.find((f) => f?.property && ['colleague-uuid'].includes(f?.property) && f.operand === operand)
      ?.value as string[]) || [];

  return colleagueSimple
    .filter((c) => c.uuid && colleaguesAddIds.includes(c.uuid))
    .map(({ uuid, firstName, lastName }) => ({ value: uuid, label: `${firstName} ${lastName}` }));
};
