import { getSelectedTreatmentValue } from './index';

describe('<Feedback /> utils', () => {
  describe('#getSelectedTreatmentValue', () => {
    it('should return the value of first found attribute with name voice', () => {
      const profileAttributes = [
        {
          colleagueUuid: 'mocked_uuid_1',
          name: 'mocked_name_1',
          type: 'mocked_type_1',
          value: 'mocked_value_1',
        },
        {
          colleagueUuid: 'mocked_uuid_2',
          name: 'voice',
          type: 'mocked_type_2',
          value: 'mocked_value_2',
        },
        {
          colleagueUuid: 'mocked_uuid_3',
          name: 'voice',
          type: 'mocked_type_3',
          value: 'mocked_value_3',
        },
      ];

      expect(getSelectedTreatmentValue(profileAttributes)).toBe('mocked_value_2');
    });

    it('should return first items value, if nothing found', () => {
      const profileAttributes = [
        {
          colleagueUuid: 'mocked_uuid_1',
          name: 'mocked_name_1',
          type: 'mocked_type_1',
          value: 'mocked_value_1',
        },
        {
          colleagueUuid: 'mocked_uuid_2',
          name: 'mocked_name_2',
          type: 'mocked_type_2',
          value: 'mocked_value_2',
        },
        {
          colleagueUuid: 'mocked_uuid_3',
          name: 'mocked_name_3',
          type: 'mocked_type_3',
          value: 'mocked_value_3',
        },
      ];

      expect(getSelectedTreatmentValue(profileAttributes)).toBe('mocked_value_1');
    });
  });
});
