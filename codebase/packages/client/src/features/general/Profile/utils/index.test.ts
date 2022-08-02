import { getMissedFields } from './index';

describe('#getMissedFields', () => {
  it('should return empty array, if all fields have data', () => {
    const info = {
      managerUUID: 'mocked_manager_uuid',
      colleague: {
        profile: {
          firstName: 'mocked_first_name',
          lastName: 'mocked_last_name',
        },
        workRelationships: [
          {
            job: {
              name: 'mocked_job_name',
            },
            department: {
              name: 'mocked_department_name',
            },
            managerUUID: 'mocked_manager_uuid',
          },
        ],
      },
    };

    expect(getMissedFields(info)).toEqual([]);
  });

  it('should return an array with empty fields', () => {
    const info = {
      colleague: {
        profile: {
          lastName: 'mocked_last_name',
        },
        workRelationships: [
          {
            department: {
              name: 'mocked_department_name',
            },
          },
        ],
      },
    };

    expect(getMissedFields(info)).toEqual(['managerUUID', 'profile/firstName', 'workRelationships/job/name']);
  });

  it('should return an array with nullable fields', () => {
    const info = {
      managerUUID: null,
      colleague: {
        profile: {
          firstName: null,
          lastName: 'mocked_last_name',
        },
        workRelationships: [
          {
            job: null,
            department: {
              name: 'mocked_department_name',
            },
            managerUUID: null,
          },
        ],
      },
    };

    expect(getMissedFields(info)).toEqual(['managerUUID', 'profile/firstName', 'workRelationships/job/name']);
  });

  it('should return an array with empty string fields', () => {
    const info = {
      managerUUID: '',
      colleague: {
        profile: {
          firstName: '',
          lastName: 'mocked_last_name',
        },
        workRelationships: [
          {
            job: '',
            department: {
              name: 'mocked_department_name',
            },
            managerUUID: '',
          },
        ],
      },
    };

    expect(getMissedFields(info)).toEqual(['managerUUID', 'profile/firstName', 'workRelationships/job/name']);
  });

  it('should return an array with false fields', () => {
    const info = {
      managerUUID: false,
      colleague: {
        profile: {
          firstName: false,
          lastName: 'mocked_last_name',
        },
        workRelationships: [
          {
            job: false,
            department: {
              name: 'mocked_department_name',
            },
            managerUUID: false,
          },
        ],
      },
    };

    expect(getMissedFields(info)).toEqual(['managerUUID', 'profile/firstName', 'workRelationships/job/name']);
  });

  it('should return an array with 0 fields', () => {
    const info = {
      managerUUID: 0,
      colleague: {
        profile: {
          firstName: 0,
          lastName: 'mocked_last_name',
        },
        workRelationships: [
          {
            job: 0,
            department: {
              name: 'mocked_department_name',
            },
            managerUUID: 0,
          },
        ],
      },
    };

    expect(getMissedFields(info)).toEqual(['managerUUID', 'profile/firstName', 'workRelationships/job/name']);
  });
});
