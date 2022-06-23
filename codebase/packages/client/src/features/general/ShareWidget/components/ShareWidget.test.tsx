import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import { ShareWidgetBase, TEST_ID } from './ShareWidgetBase';
import { getTescoContent } from './getTescoContent';

describe('ShareWidget', () => {
  it('should render ShareWidget', async () => {
    const users = {
      current: {
        authenticated: true,
        info: {
          success: true,
          data: {
            colleague: {
              workRelationships: [
                {
                  isManager: false,
                },
              ],
            },
            roles: ['Colleague'],
          },
        },
      },
    };
    const objectivesSharing = {
      objectives: [
        {
          type: 'OBJECTIVE',
          status: 'DRAFT',
          number: 1,
          properties: {
            textfield: 'textfield_textfield',
          },
        },
      ],
      isShared: false,
      meta: {
        loading: false,
        loaded: false,
        error: null,
      },
    };
    const reviews = {
      data: [
        {
          type: 'OBJECTIVE',
          status: 'DRAFT',
          number: 1,
          properties: {
            textfield: 'textfield_textfield',
          },
        },
      ],
      colleagueReviews: {},
      meta: {
        loading: false,
        loaded: true,
        error: null,
        status: null,
      },
    };

    renderWithTheme(<ShareWidgetBase stopShare getContent={getTescoContent} />, { reviews, users, objectivesSharing });
    const widget = screen.getByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });
});
