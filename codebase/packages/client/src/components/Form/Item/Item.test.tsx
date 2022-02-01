import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';

import { Item } from './Item';
import { Input } from '../Input';

describe('Item', () => {
  const onChange = jest.fn();
  it('render item without label', async () => {
    const { container } = render(
      <Item>
        <Input onChange={onChange} />
      </Item>,
    );

    const noLabel = container.querySelector('label');

    expect(noLabel).not.toBeInTheDocument();
  });

  it('render item with label', async () => {
    const { container } = render(
      <Item label={'test'}>
        <Input onChange={onChange} />
      </Item>,
    );

    const label = container.querySelector('label');

    expect(label).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('render item click on icon', async () => {
    render(
      <Item label={'test'}>
        <Input onChange={onChange} />
      </Item>,
    );

    expect(screen.queryByTitle('roundStop')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Microphone'));
    expect(screen.getByTitle('Round Stop')).toBeInTheDocument();
  });
});
