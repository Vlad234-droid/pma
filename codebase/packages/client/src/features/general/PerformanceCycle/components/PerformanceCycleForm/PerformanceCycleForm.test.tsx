import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { TILE_WRAPPER } from 'components/Tile';
import PerformanceCycleForm, { PERFORMANCE_CYCLE_FORM } from './PerformanceCycleForm';
import { PerformanceStepperContext } from '../../context/PerformanceStepper';

import { FormType } from '../../constants/type';

describe('Performance cycle form', () => {
  const onSubmit = jest.fn();
  const getConfigEntriesByUuid = jest.fn();

  const defaultValues = {
    entryConfigKey: 'bank_b',
    template: {
      fileName: 'mocked_fileName',
      description: 'mocked_description',
    },
  };

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
    onSubmit,
    defaultValues,
    getConfigEntriesByUuid,
    canEdit: true,
  };
  it('it should render PerformanceCycleForm', () => {
    const { getByTestId } = renderWithTheme(<PerformanceCycleForm {...props} />, { ...initState });

    const wrapper = getByTestId(PERFORMANCE_CYCLE_FORM);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render PerformanceCycleForm', () => {
    const { getByTestId } = renderWithTheme(
      <PerformanceStepperContext.Provider value={{ activeStepper: FormType.GENERAL }}>
        <PerformanceCycleForm {...props} />
      </PerformanceStepperContext.Provider>,
      { ...initState },
    );

    const wrapper = getByTestId(TILE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render PerformanceCycleForm', () => {
    const { getByText } = renderWithTheme(
      <PerformanceStepperContext.Provider value={{ activeStepper: FormType.DETAILS }}>
        <PerformanceCycleForm {...props} />
      </PerformanceStepperContext.Provider>,
      { ...initState },
    );

    const key = getByText('bank_b');
    const description = getByText('mocked_description');
    expect(key).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
