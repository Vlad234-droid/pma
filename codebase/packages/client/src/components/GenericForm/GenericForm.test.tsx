import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from 'styles/test-theme-provider';
import GenericForm from './GenericForm';

it('render GenericForm', async () => {
  render(
    <GenericForm
      formFields={[{ Element: () => <>🐽</>, testID: 'test-id', name: 'test-name' }]}
      onSubmit={() => {
        return;
      }}
      schema={{ fields: [] } as any}
    />,
  );
  expect(screen.getByText('🐽')).toBeInTheDocument();
});
