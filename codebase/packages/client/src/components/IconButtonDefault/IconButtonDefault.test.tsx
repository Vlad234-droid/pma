import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as themeRender } from 'utils/test';

import IconButtonDefault from './IconButtonDefault';

describe('IconButtonDefault', () => {
  it('should correctly pass the event handlers down and fire them as expected', () => {
    const onClick = jest.fn();

    const handlers = { onClick };

    const { getByRole } = themeRender(
      <IconButtonDefault graphic='add' {...handlers}>
        Button
      </IconButtonDefault>,
    );
    const button = getByRole('button');

    fireEvent.click(button);

    expect(onClick).toBeCalled();
  });
});
