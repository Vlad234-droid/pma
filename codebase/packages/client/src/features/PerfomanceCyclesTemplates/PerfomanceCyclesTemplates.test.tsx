import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from '../../utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import PerfomanceCyclesTemplates, {
  PERFOMANCE_WRAPPER,
  FILTER_MODAL_ID,
  SETTINGS_BTN_ID,
  WRAPPER_INPUT_ID,
  INPUT_TEST_ID,
} from './PerfomanceCyclesTemplates';

it('Perfomance page', async () => {
  const { getByTestId, queryByTestId } = renderWithTheme(<PerfomanceCyclesTemplates />);

  const wrapper = getByTestId(PERFOMANCE_WRAPPER);
  const settingsBtn = getByTestId(SETTINGS_BTN_ID);
  const filterModal = queryByTestId(FILTER_MODAL_ID);
  const filterModalStyle = window.getComputedStyle(filterModal);
  const wrapperInputStyle = window.getComputedStyle(getByTestId(WRAPPER_INPUT_ID));

  const input = getByTestId(INPUT_TEST_ID);

  expect(filterModalStyle.transform).toBe('scaleY(0)');

  expect(wrapperInputStyle.width).toBe('38px');

  fireEvent.click(settingsBtn);
  fireEvent.focus(input);

  const filterModalPressedStyle = window.getComputedStyle(filterModal);
  const wrapperInputPressedStyle = window.getComputedStyle(getByTestId(WRAPPER_INPUT_ID));

  expect(filterModalPressedStyle.transform).toBe('scaleY(1)');

  expect(wrapperInputPressedStyle.width).toBe('240px');

  expect(filterModal).toBeInTheDocument();

  expect(wrapper).toBeInTheDocument();
});
