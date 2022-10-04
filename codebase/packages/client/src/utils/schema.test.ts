import { theme } from '@pma/dex-wrapper';
import { formTagCheck, formTagComponents } from './schema';

jest.mock('@pma/dex-wrapper', () => ({
  theme: { colors: { lightGray: 'test', tescoBlue: 'blue' } },
  colors: { lightGray: 'test', tescoBlue: 'blue' },
}));

describe('features/general/Objectives/utils/schema', () => {
  describe('formTagCheck', () => {
    it('formTagCheck empty component', async () => {
      const res = formTagCheck([]);
      expect(res).toBeTruthy();
    });
    it('formTagCheck not opened not closed component', async () => {
      const res = formTagCheck([
        {
          text: '## Look back',
          type: 'text',
          id: 'Field_0hu83pj',
          key: 'Field_0hu83pj',
          expression: {},
        },
      ]);
      expect(res).toBeTruthy();
    });
    it('formTagCheck not closed tag', async () => {
      const component = [
        {
          text: '',
          type: 'text',
          id: 'Field_1gbty45',
          text_origin: '',
          expression: {
            tag: {
              block: ['open'],
            },
          },
        },
        {
          text: '## Look back',
          type: 'text',
          id: 'Field_0hu83pj',
          text_origin: '## Look back',
          expression: {},
        },
      ];
      const res = formTagCheck(component);
      expect(res).toBeFalsy();
    });

    it('formTagCheck not opened tag', async () => {
      const component = [
        {
          text: '',
          type: 'text',
          id: 'Field_1gbty45',
          text_origin: '',
          expression: {
            tag: {
              block: ['close'],
            },
          },
        },
        {
          text: '## Look back',
          type: 'text',
          id: 'Field_0hu83pj',
          text_origin: '## Look back',
          expression: {},
        },
      ];
      const res = formTagCheck(component);
      expect(res).toBeFalsy();
    });
    it('formTagCheck opened closed tag', async () => {
      const component = [
        {
          text: '',
          type: 'text',
          id: 'Field_1gbty45',
          text_origin: '',
          expression: {
            tag: {
              block: ['open'],
            },
          },
        },
        {
          text: '## Look back',
          type: 'text',
          id: 'Field_0hu83pj',
          text_origin: '## Look back',
          expression: {},
        },
        {
          text: '',
          type: 'text',
          id: 'Field_1gbty45',
          text_origin: '',
          expression: {
            tag: {
              block: ['close'],
            },
          },
        },
      ];
      const res = formTagCheck(component);
      expect(res).toBeTruthy();
    });
  });

  describe('formTagComponents', () => {
    it('formTagComponents empty component', async () => {
      const res = formTagComponents([], theme);
      expect(res).toBeTruthy();
    });

    it('formTagComponents opened closed tag', async () => {
      const component = [
        {
          text: '',
          type: 'text',
          id: 'Field_1gbty45',
          text_origin: '',
          expression: {
            tag: {
              block: ['open'],
            },
          },
        },
        {
          text: '## Look back',
          type: 'text',
          id: 'Field_0hu83pj',
          text_origin: '## Look back',
          expression: {},
        },
        {
          text: '',
          type: 'text',
          id: 'Field_1gbty45',
          text_origin: '',
          expression: {
            tag: {
              block: ['close'],
            },
          },
        },
      ];
      const res = formTagComponents(component, theme);
      expect(res).toEqual([
        {
          expression: { tag: { block: ['open'] } },
          id: 'Field_1gbty45',
          level: 1,
          borderStyle: {
            '> div': {
              '& > h2,h3': {
                padding: '14px 0 14px',
                margin: 0,
                letterSpacing: '0px',
              },
            },
            borderLeft: '2px solid test',
            borderRadius: '10px 10px 0 0',
            borderRight: '2px solid test',
            borderTop: '2px solid test',
            boxShadow: '3px 0px 0px 0px rgba(0, 0, 0, 0.05)',
            marginTop: '12px',
            padding: '5px 20px',
          },
          text: '',
          text_origin: '',
          type: 'text',
        },
        {
          expression: {},
          id: 'Field_0hu83pj',
          level: 1,
          borderStyle: {
            '> div': {
              '& > h2,h3': {
                padding: '14px 0 14px',
                margin: 0,
                letterSpacing: '0px',
              },
            },
            borderLeft: '2px solid test',
            borderRight: '2px solid test',
            boxShadow: '3px 0px 0px 0px rgba(0, 0, 0, 0.05)',
            padding: '0px 20px',
          },
          text: '## Look back',
          text_origin: '## Look back',
          type: 'text',
        },
        {
          expression: { tag: { block: ['close'] } },
          id: 'Field_1gbty45',
          level: 1,
          borderStyle: {
            '> div': {
              '& > h2,h3': {
                padding: '14px 0 14px',
                margin: 0,
                letterSpacing: '0px',
              },
            },
            borderBottom: '2px solid test',
            borderLeft: '2px solid test',
            borderRadius: '0 0 10px 10px',
            borderRight: '2px solid test',
            boxShadow: '2px 1px 1px 1px rgba(0, 0, 0, 0.05)',
            padding: '0px 20px 20px',
          },
          text: '',
          text_origin: '',
          type: 'text',
        },
      ]);
    });
  });
});
