import '@testing-library/jest-dom/extend-expect';
//@ts-ignore
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from '../../utils/test';
import { buildPath } from '../../features/Routes';
import { Page } from '../../pages';
import { RouterSwitch } from '../RouterSwitch';

it('render RouterSwitch', async () => {
  const history = createMemoryHistory();
  history.push('/career-performance');
  const { getByText } = render(
    <Router history={history}>
      <RouterSwitch
        links={[
          { link: buildPath(Page.MY_VIEW), name: 'View' },
          { link: buildPath(Page.MY_TEAM), name: 'Team' },
        ]}
      />
    </Router>,
  );
  expect(getByText('View')).toBeInTheDocument();
  expect(getByText('View').closest('a')).toHaveClass('active');
  expect(getByText('Team')).toBeInTheDocument();
  expect(getByText('Team').closest('a')).not.toHaveClass('active');

  fireEvent.click(getByText('Team'));
  expect(getByText('View').closest('a')).not.toHaveClass('active');
  expect(getByText('Team').closest('a')).toHaveClass('active');
});
