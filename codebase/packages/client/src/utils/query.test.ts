import { buildSearchColleaguesQuery } from './query';

describe('buildSearchColleaguesQuery', () => {
  it('return plain object when we have only one path of full name', () => {
    const name = 'Max';
    const query = buildSearchColleaguesQuery(name);
    expect(query).toEqual({
      'first-name_like': name,
      'last-name_like': name,
    });
  });
  it('return _groups array when we have only one path of full name', () => {
    const firstName = 'Max';
    const lastName = 'Dou';
    const query = buildSearchColleaguesQuery(`${firstName} ${lastName}`);
    expect(query).toEqual({
      _groups: [
        {
          'first-name_like': firstName,
          'last-name_like': lastName,
          _type: 'AND',
        },
      ],
    });
  });
});
