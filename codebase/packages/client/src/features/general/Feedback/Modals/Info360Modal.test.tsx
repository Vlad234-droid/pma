import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import Info360Modal, { INFO_MODAL } from './Info360Modal';

describe('it should render no feedback tile', () => {
  it('no feedback tile', () => {
    const handlder = jest.fn();
    const props = {
      setInfo360Modal: handlder,
    };

    const { getByTestId } = render(<Info360Modal {...props} />);
    const wrapper = getByTestId(INFO_MODAL);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should close info modal', () => {
    const handlder = jest.fn();
    const props = {
      setInfo360Modal: handlder,
    };
    render(<Info360Modal {...props} />);
    props.setInfo360Modal();
    expect(props.setInfo360Modal).toHaveBeenCalledTimes(1);
  });
});
