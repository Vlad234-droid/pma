import { SearchOption } from 'config/enum';

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
