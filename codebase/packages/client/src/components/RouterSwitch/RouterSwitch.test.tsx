import '@testing-library/jest-dom/extend-expect';
//@ts-ignore
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithTheme as render, screen } from '../../utils/test';
import { buildPath } from '../../features/Routes';
import { Page } from '../../pages';
import { RouterSwitch } from '../RouterSwitch';

it('render RouterSwitch', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={buildPath(Page.CONTRIBUTION)} navigator={history}>
      <RouterSwitch
        links={[
          { link: buildPath(Page.CONTRIBUTION), name: 'View' },
          { link: buildPath(Page.MY_TEAM), name: 'Team' },
        ]}
      />
      ,
    </Router>,
  );
  expect(screen.getByText('View')).toBeInTheDocument();
  expect(screen.getByText('View').closest('a')).toHaveClass('active');
  expect(screen.getByText('Team')).toBeInTheDocument();
  expect(screen.getByText('Team').closest('a')).not.toHaveClass('active');

  // todo did not find quick solution to test switch to diff location. commented for now
  // fireEvent.click(getByText('Team'));
  //
  // expect(screen.getByText('View').closest('a')).not.toHaveClass('active');
  // expect(screen.getByText('Team').closest('a')).toHaveClass('active');
});
