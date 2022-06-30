import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { TILE_WRAPPER } from 'components/Tile';
import Profile, { AvatarName } from './Profile';

describe('Profile component', () => {
  const props = {
    fullName: 'fullName',
    job: 'job',
    department: 'department',
    manager: 'manager',
  };
  it('it should render Profile', async () => {
    const { getByTestId } = render(<Profile {...props} />);
    const wrapper = getByTestId(TILE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render Profile info', async () => {
    const { getByText } = render(<Profile {...props} />);
    const fullName = getByText(props.fullName);
    const job = getByText(props.job);
    const department = getByText(props.department);
    const manager = getByText(props.manager);
    expect(fullName).toBeInTheDocument();
    expect(job).toBeInTheDocument();
    expect(department).toBeInTheDocument();
    expect(manager).toBeInTheDocument();
  });
});
describe('AvatarName component', () => {
  const user = {
    fullName: 'fullName',
    job: 'job',
  };

  it('it should render AvatarName info', async () => {
    const { getByText } = render(<AvatarName user={user} />);
    const fullName = getByText(user.fullName);
    const job = getByText(user.job);

    expect(fullName).toBeInTheDocument();
    expect(job).toBeInTheDocument();
  });
});
