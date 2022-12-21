import { Operand, SearchOption } from 'config/enum';

export type QueryType = Record<string, string | Array<Record<string, string>>>;

export const buildSearchColleaguesQuery = (value: string, searchOption: SearchOption): QueryType => {
  let query = {};

  if (searchOption === SearchOption.EMAIL) {
    query = {};
    query['email_like'] = value;
    return query;
  }

  if (/ /.test(value)) {
    const [firstName, lastName] = value.split(' ');
    query['_groups'] = [
      {
        'first-name_like': firstName,
        'last-name_like': lastName,
        _type: 'AND',
      },
    ];
  } else {
    query['first-name_like'] = value;
    query['last-name_like'] = value;
  }

  return query;
};

export const buildSearchFeedbacksQuery = (value: string): any => {
  const query = {};
  if (/ /.test(value)) {
    const [firstName, lastName] = value.split(' ');

    query['target-colleague-first-name_contains'] = firstName;
    query['target-colleague-last-name_contains'] = lastName;
  } else {
    query['_search'] = value;
  }

  return query;
};

export const buildSearchColleaguesReviews = (value: string): any => {
  const query = {};
  if (/ /.test(value)) {
    const [firstName, lastName] = value.split(' ');

    query['_sort'] = `first-name:${firstName},last-name:${lastName}`;
  } else {
    query['_sort'] = `first-name:${value},last-name:${value}`;
  }
  return query;
};

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
  Object.entries(filter || {}).reduce((acc, [key, val]) => {
    if (typeof val === 'object') {
      const keys = Object.entries(val || {})
        .filter(([, value]) => !!value)
        .map(([key]) => key);
      if (keys.length) {
        return { ...acc, [`${filterMapRevers[key] || key}${Operand.IN}`]: keys };
      }
      return acc;
    } else {
      return { ...acc, [`${filterMapRevers[key] || key}${Operand.IN}`]: val };
    }
  }, {});
