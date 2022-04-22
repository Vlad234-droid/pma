import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import Section from './Section';

describe('<Section />', () => {
  it('should render Section', async () => {
    const Children = () => <div data-test-id='children-node'>test</div>;
    const props = {
      title: { content: 'title' },
      right: { content: 'rightContent' },
      left: { content: 'leftContent' },
    };
    renderWithTheme(
      <Section {...props}>
        <Children />
      </Section>,
    );
    const children = screen.getByTestId('children-node');
    expect(children).toBeInTheDocument();

    const title = screen.getByText('title');
    expect(title).toBeInTheDocument();
    const rightContent = screen.getByText('rightContent');
    expect(rightContent).toBeInTheDocument();
    const leftContent = screen.getByText('leftContent');
    expect(leftContent).toBeInTheDocument();
  });
});
