import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { TILE_WRAPPER } from 'components/Tile';
import GeneralSettings from './GeneralSettings';

describe('General settings', () => {
  const mockErrors = {};
  const mockSetValue = jest.fn();
  const mockChangeTemplate = jest.fn();

  const initState = {
    performanceCycle: {
      mappingKeys: ['bank_b', 'bank_a', 'group_a1', 'group_c', 'group_a2', 'group_b'],
    },
    processTemplate: {
      data: [
        {
          createdBy: '69b3ca74-cba0-4efb-a537-7499410de9cc',
          createdTime: '2023-04-12T12:18:43.230Z',
          description: 'mocked_description',
          fileName: 'bank_b.bpmn',
          path: 'cycles',
          uuid: '5fe15c64-827e-43c2-a6c8-c5c1ff033523',
        },
      ],
    },
  };

  const props = {
    formValues: {},
    setValue: mockSetValue,
    errors: mockErrors,
    canEdit: true,
    changeTemplate: mockChangeTemplate,
  };
  it('render GeneralSettings', () => {
    const { getByTestId } = renderWithTheme(<GeneralSettings {...props} />, { ...initState });

    const wrapper = getByTestId(TILE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  test('it should render input fields and labels', () => {
    const { getAllByText } = renderWithTheme(<GeneralSettings {...props} />, { ...initState });

    expect(getAllByText(/Cycle name/i)[0]).toBeInTheDocument();
    expect(getAllByText(/Cycle group/i)[0]).toBeInTheDocument();
    expect(getAllByText(/Template/i)[0]).toBeInTheDocument();
  });
  test('it should render file name', () => {
    props.formValues = {
      entryConfigKey: 'group_c',
      template: {
        uuid: 'mocked_uuid',
        fileName: 'mocked_file_name',
      },
    };
    const { getByText } = renderWithTheme(<GeneralSettings {...props} />, { ...initState });
    expect(getByText('mocked_file_name')).toBeInTheDocument();
  });
});
