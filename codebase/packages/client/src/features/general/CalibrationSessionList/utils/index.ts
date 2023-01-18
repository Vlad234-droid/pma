import { Condition, ColleagueFilterOptions } from '@pma/openapi';
import { filterMap } from 'utils';

export const dataFromSessionResponse = (filter: Condition[], colleagueFilter: ColleagueFilterOptions) => {
  return filter
    .filter((f) => f?.property && !['colleague-uuid', 'wl3-manager-depth', 'colleague-uuid-only'].includes(f?.property))
    .reduce((acc, val) => {
      if (val.property) {
        const propertyFilter = colleagueFilter[filterMap[val.property] || val.property]
          ?.filter((prop) => {
            const include: string = prop?.uuid ? prop.uuid : prop.code;
            if (Array.isArray(val.value) && include && val.value.includes(include)) {
              return true;
            }
            if (typeof val.value === 'string' && include && val.value === include) {
              return true;
            }
            return false;
          })
          .map((prop) => {
            if (prop?.name) {
              return prop;
            } else {
              return { ...prop, name: `${prop.firstName} ${prop.firstName}` };
            }
          });
        acc[filterMap[val.property] || val.property] = propertyFilter;
      }
      return acc;
    }, {});
};
