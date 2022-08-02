import get from 'lodash.get';

import RequiredFields from '../config/requiredFields';

// TODO: type info
export const getMissedFields = (info: any) =>
  RequiredFields.filter((field) => {
    const topLevel = get(info, field);
    const colleagueLevel = get(info, `colleague.${field.replace('/', '.')}`);
    const workRelationsLevel = get(
      info,
      `colleague.workRelationships[0]${field.replace('workRelationships/', '').replace('/', '.')}`,
    );

    return !topLevel && !colleagueLevel && !workRelationsLevel;
  });
