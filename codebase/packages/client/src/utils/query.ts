export type QueryType = Record<string, string | Array<Record<string, string>>>;

export const buildSearchColleaguesQuery = (value: string): QueryType => {
  const query = {};

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
