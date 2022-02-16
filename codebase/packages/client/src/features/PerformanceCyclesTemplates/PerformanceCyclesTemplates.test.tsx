import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import PerformanceCyclesTemplates from './PerformanceCyclesTemplates';
import { PERFOMANCE_WRAPPER, FILTER_MODAL_ID, SETTINGS_BTN_ID, WRAPPER_INPUT_ID, INPUT_TEST_ID } from './config';

describe('Performance page', () => {
  it('Performance page wrapper', async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(<PerformanceCyclesTemplates />);

    const wrapper = getByTestId(PERFOMANCE_WRAPPER);
    const filterModal = queryByTestId(FILTER_MODAL_ID);

    expect(filterModal).toBeInTheDocument();
    expect(wrapper).toBeInTheDocument();
  });
  it('sort filter', async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(<PerformanceCyclesTemplates />);

    const settingsBtn = getByTestId(SETTINGS_BTN_ID);
    const filterModal = queryByTestId(FILTER_MODAL_ID) as HTMLElement;
    const filterModalStyle = window.getComputedStyle(filterModal);

    expect(filterModalStyle.transform).toBe('scaleY(0)');

    fireEvent.click(settingsBtn);

    const filterModalPressedStyle = window.getComputedStyle(filterModal);

    expect(filterModalPressedStyle.transform).toBe('scaleY(1)');
    expect(filterModal).toBeInTheDocument();
  });

  it('search input', async () => {
    const { getByTestId } = renderWithTheme(<PerformanceCyclesTemplates />);

    const wrapperInputStyle = window.getComputedStyle(getByTestId(WRAPPER_INPUT_ID));
    const input = getByTestId(INPUT_TEST_ID);

    expect(wrapperInputStyle.width).toBe('38px');

    fireEvent.focus(input);

    const wrapperInputPressedStyle = window.getComputedStyle(getByTestId(WRAPPER_INPUT_ID));

    expect(wrapperInputPressedStyle.width).toBe('240px');
  });
});
