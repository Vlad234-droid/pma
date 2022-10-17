import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render, screen } from 'utils/test';
import '@testing-library/jest-dom/extend-expect';

import { RadioGroup } from '../RadioGroup';

it('render RadioGroup', async () => {
  const onChange = jest.fn();
  const result = render(
    <RadioGroup
      id='radio'
      name='radio'
      options={[
        { label: 'test', value: 'test' },
        { label: 'test1', value: 'test1' },
      ]}
      onChange={onChange}
    />,
  );
  const radioElement = result.container.querySelector('#radio-test');
  const radio1Element = result.container.querySelector('#radio-test1');

  expect(radioElement).toBeInTheDocument();
  expect(radio1Element).toBeInTheDocument();

  const element = screen.getByText('test1');

  fireEvent.click(element);
  expect(onChange).toHaveBeenCalled();
});
