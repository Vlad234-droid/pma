import React from 'react';
import { useParams } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header, { FIRST_STEP, HEADER_WRAPPER, LAST_STEP } from './Header';

import { FormType } from '../../constants/type';
import { renderWithTheme } from 'utils/test';
import { Status } from 'config/enum';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Header component', () => {
  (useParams as jest.Mock).mockReturnValue({ performanceCycleUuid: 'new' });
  const onSubmit = jest.fn();
  const onDraft = jest.fn();
  const trigger = jest.fn();
  const props = {
    data: [
      { text: 'mocked_text1', type: FormType.GENERAL },
      { text: 'mocked_text2', type: FormType.DETAILS },
    ],
    isGeneralValid: false,
    onSubmit,
    onDraft,
    canEdit: true,
    isValidForm: false,
    status: '' as Status,
    trigger,
  };
  it('render Header', () => {
    const { getByTestId } = renderWithTheme(<Header {...props} />);

    const wrapper = getByTestId(HEADER_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render header text', () => {
    const { getByText } = renderWithTheme(<Header {...props} />);

    const text1 = getByText('mocked_text1');
    const text2 = getByText('mocked_text2');
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });
  it('it should fire onDraft handler', () => {
    const { getByText } = renderWithTheme(<Header {...props} status={Status.DRAFT} />);

    const draft = getByText(/Save as draft/i);
    fireEvent.click(draft);
    expect(onDraft).toHaveBeenCalled();
  });
  it('it should render actions icon', () => {
    (useParams as jest.Mock).mockReturnValue({ performanceCycleUuid: 'mocked_uuid' });
    const { getByTestId } = renderWithTheme(<Header {...props} />);
    const dotsIcon = getByTestId('dots');

    expect(dotsIcon).toBeInTheDocument();
  });
  it('it should fire handleNext handler', async () => {
    const { findByTestId } = renderWithTheme(<Header {...props} canEdit={false} />);

    const button = await findByTestId(FIRST_STEP);
    fireEvent.click(button);
    expect(trigger).toHaveBeenCalled();
  });
  it('it should fire onSubmit handler', async () => {
    const { findByTestId } = renderWithTheme(
      <Header {...props} isGeneralValid={true} isValidForm={true} canEdit={true} />,
    );

    const button = await findByTestId(LAST_STEP);
    fireEvent.click(button);
    expect(trigger).toHaveBeenCalled();
  });
});
