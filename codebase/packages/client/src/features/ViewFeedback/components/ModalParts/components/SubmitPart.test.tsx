import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import SubmitPart, { WRAPPER } from './SubmitPart';

jest.mock('@pma/pdf-renderer', () => {
  return {
    __esModule: true,
    usePDF: () => {
      return ['mock', () => true];
    },
  };
});

describe('Submit Part component', () => {
  const onChange = jest.fn();
  const props = {
    selectedPerson: {},
    searchDate: '',
    onChange,
  };
  it('it should render list wrapper', async () => {
    const { getByTestId } = render(<SubmitPart {...props} />);
    const wrapper = getByTestId(WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should call onChange handler', async () => {
    render(<SubmitPart {...props} />);
    expect(onChange).toHaveBeenCalled();
  });
});
