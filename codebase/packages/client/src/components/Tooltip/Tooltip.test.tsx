import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';

import { TooltipWrapper as Tooltip } from './index';

it('tooltip element trigger', async () => {
  render(
    <Tooltip text='Hello'>
      <button>info</button>
    </Tooltip>,
  );
  const tooltip = screen.getByText('info');
  expect(tooltip).toBeInTheDocument();
});

it('tooltip hover', async () => {
  const { container } = render(
    <Tooltip text='Hello'>
      <button>info</button>
    </Tooltip>,
  );
  const nullPopover = screen.queryByText('tooltip');
  expect(nullPopover).not.toBeInTheDocument();

  fireEvent.mouseMove(container);
  fireEvent.mouseEnter(screen.queryByRole('button'));

  expect(screen.queryByRole('tooltip')).toBeInTheDocument();

  fireEvent.mouseLeave(screen.queryByRole('button'));
  await waitForElementToBeRemoved(() => screen.queryByRole('tooltip'));
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

it('tooltip click', async () => {
  render(
    <Tooltip text='Hello'>
      <button>info</button>
    </Tooltip>,
  );
  const nullPopover = screen.queryByText('tooltip');
  expect(nullPopover).not.toBeInTheDocument();

  fireEvent.click(screen.queryByRole('button'));

  expect(screen.queryByRole('tooltip')).toBeInTheDocument();

  fireEvent.click(screen.queryByRole('button'));
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});
