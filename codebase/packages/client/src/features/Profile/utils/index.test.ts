import { getMissedFields } from './index';

describe('#getMissedFields', () => {
  it('should return empty array, if all fields have data on first level', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      email: 'mocked_email',
      fullName: 'mocked_full_name',
      firstName: 'mocked_first_name',
      dateOfBirth: 'mocked_date_of_birth',
      gender: 'mocked_gender',
    };

    expect(getMissedFields(info)).toEqual([]);
  });

  it('should return empty array, if all fields have data on other levels', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      fullName: 'mocked_full_name',
      data: {
        colleague: {
          contact: {
            email: 'mocked_email',
          },
          profile: {
            firstName: 'mocked_first_name',
            dateOfBirth: 'mocked_date_of_birth',
            gender: 'mocked_gender',
          }
        }
      }
    };

    expect(getMissedFields(info)).toEqual([]);
  });

  it('should return an array with empty fields on first level', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      email: 'mocked_email',
      fullName: 'mocked_full_name',
    };

    expect(getMissedFields(info)).toEqual(['firstName', 'dateOfBirth', 'gender']);
  });

  it('should return an array with empty fields on other levels', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      fullName: 'mocked_full_name',
      data: {
        colleague: {
          contact: {
          },
          profile: {
          }
        }
      }
    };

    expect(getMissedFields(info)).toEqual(['email', 'firstName', 'dateOfBirth', 'gender']);
  });

  it('should return an array with nullable fields on first level', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      email: 'mocked_email',
      fullName: 'mocked_full_name',
      firstName: null,
      dateOfBirth: null,
      gender: null,
    };

    expect(getMissedFields(info)).toEqual(['firstName', 'dateOfBirth', 'gender']);
  });

  it('should return an array with nullable fields on other levels', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      fullName: 'mocked_full_name',
      data: {
        colleague: {
          contact: {
            email: null,
          },
          profile: {
            firstName: null,
            dateOfBirth: null,
            gender: null,
          }
        }
      }
    };

    expect(getMissedFields(info)).toEqual(['email', 'firstName', 'dateOfBirth', 'gender']);
  });

  it('should return an array with empty string fields on first level', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      email: 'mocked_email',
      fullName: 'mocked_full_name',
      firstName: '',
      dateOfBirth: '',
      gender: '',
    };

    expect(getMissedFields(info)).toEqual(['firstName', 'dateOfBirth', 'gender']);
  });

  it('should return an array with empty string fields on other levels', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      fullName: 'mocked_full_name',
      data: {
        colleague: {
          contact: {
            email: '',
          },
          profile: {
            firstName: '',
            dateOfBirth: '',
            gender: '',
          }
        }
      }
    };

    expect(getMissedFields(info)).toEqual(['email', 'firstName', 'dateOfBirth', 'gender']);
  });

  it('should not include fields with false value to empty fields array on first level', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      email: 'mocked_email',
      fullName: 'mocked_full_name',
      firstName: 'mocked_first_name',
      dateOfBirth: 'mocked_date_of_birth',
      gender: false,
    };

    expect(getMissedFields(info)).toEqual([]);
  });

  it('should not include fields with false value to empty fields array on first level', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      fullName: 'mocked_full_name',
      data: {
        colleague: {
          contact: {
            email: false,
          },
          profile: {
            firstName: false,
            dateOfBirth: false,
            gender: false,
          }
        }
      }
    };

    expect(getMissedFields(info)).toEqual([]);
  });

  it('should not include fields with 0 value to empty fields array on first level', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      email: 'mocked_email',
      fullName: 'mocked_full_name',
      firstName: 'mocked_first_name',
      dateOfBirth: 'mocked_date_of_birth',
      gender: 0,
    };

    expect(getMissedFields(info)).toEqual([]);
  });

  it('should not include fields with 0 value to empty fields array on first level', () => {
    const info = {
      manager: 'mocked_manager',
      managerUUID: 'mocked_manager_uuid',
      fullName: 'mocked_full_name',
      data: {
        colleague: {
          contact: {
            email: 0,
          },
          profile: {
            firstName: 0,
            dateOfBirth: 0,
            gender: 0,
          }
        }
      }
    };

    expect(getMissedFields(info)).toEqual([]);
  });
});