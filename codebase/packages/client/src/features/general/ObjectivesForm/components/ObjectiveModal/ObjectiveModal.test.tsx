import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import ObjectiveModal, { TEST_ID, STEP_TEST_ID, HELP_TEST_ID, FOOTER_TEST_ID } from './ObjectiveModal';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
    trigger: () => jest.fn(),
    register: () => jest.fn(),
    formState: { isValid: false, errors: {} },
    watch: () => ({ unsubscribe: () => jest.fn() }),
  }),
}));

describe('Objective Modal', () => {
  const onSaveDraft = jest.fn();
  const onSubmit = jest.fn();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape({})),
    defaultValues: {},
  });

  const props = {
    useSingleStep: true,
    methods,
    submitForm: false,
    currentObjectiveNumber: 1,
    schemaComponents: [],
    formValues: {},
    titles: ['Test title'],
    onSaveDraft,
    onSubmit,
    skipHelp: false,
    skipFooter: false,
  };

  window.HTMLElement.prototype.scrollIntoView = function () {};

  it('should render Objective Modal', async () => {
    const { queryByTestId } = render(<ObjectiveModal {...props} />);
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('should NOT render Objective Modal Step Indicator', async () => {
    const { queryByTestId } = render(<ObjectiveModal {...props} />);
    const stepper = queryByTestId(STEP_TEST_ID);
    expect(stepper).not.toBeInTheDocument();
  });

  it('should render Objective Modal Step Indicator', async () => {
    props.useSingleStep = false;
    const { queryByTestId } = render(<ObjectiveModal {...props} />);
    const stepper = queryByTestId(STEP_TEST_ID);
    expect(stepper).toBeInTheDocument();
  });

  it('should render Objective Modal Help', async () => {
    const { queryByTestId } = render(<ObjectiveModal {...props} />);
    const help = queryByTestId(HELP_TEST_ID);
    expect(help).toBeInTheDocument();
  });

  it('should NOT render Objective Modal Help', async () => {
    props.skipHelp = true;
    const { queryByTestId } = render(<ObjectiveModal {...props} />);
    const help = queryByTestId(HELP_TEST_ID);
    expect(help).not.toBeInTheDocument();
  });

  it('should render Objective Modal Footer', async () => {
    const { queryByTestId } = render(<ObjectiveModal {...props} />);
    const footer = queryByTestId(FOOTER_TEST_ID);
    expect(footer).toBeInTheDocument();
  });

  it('should NOT render Objective Modal Footer', async () => {
    props.skipFooter = true;
    const { queryByTestId } = render(<ObjectiveModal {...props} />);
    const footer = queryByTestId(FOOTER_TEST_ID);
    expect(footer).not.toBeInTheDocument();
  });
});
