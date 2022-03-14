export const buildSearchColleaguesQuery = (value) => {
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
