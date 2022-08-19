import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import { TEST_WRAPPER_ID, UserObjectivesSections } from './UserObjectivesSections';
import { Status } from 'config/enum';
import { ObjectiveTypes as OT } from 'features/general/Reviews';

describe('UserObjectivesSections component', () => {
  const props = {
    canShowObjectives: true,
    reviewLoading: false,
    reviewLoaded: true,
    objectives: [],
    children: <div>Test</div>,
  };

  it('it should render wrapper', async () => {
    props.objectives;
    const { queryByTestId } = render(
      <UserObjectivesSections
        {...props}
        objectives={[
          {
            id: 1,
            title: 'title',
            subTitle: 'subtitle',
            description: 'description',
            explanations: [{ title: 'exp title' }],
            status: Status.STARTED,
            declineReason: 'declined reason',
          },
        ]}
      />,
    );

    const wrapper = queryByTestId(TEST_WRAPPER_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('it should NOT render wrapper', async () => {
    props.canShowObjectives = false;

    const { queryByTestId } = render(<UserObjectivesSections {...props} />);
    const wrapper = queryByTestId(TEST_WRAPPER_ID);
    expect(wrapper).not.toBeInTheDocument();
  });
});
