import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';

import _GenericForm from './GenericForm';

it('render GenericForm', async () => {
  render(
    <_GenericForm
      formFields={[{ Element: () => <>🐽</>, testID: 'test-id', name: 'test-name' }]}
      onSubmit={() => {
        return;
      }}
      schema={{ fields: [] } as any}
    />,
  );
  expect(screen.getByText('🐽')).toBeInTheDocument();
});
