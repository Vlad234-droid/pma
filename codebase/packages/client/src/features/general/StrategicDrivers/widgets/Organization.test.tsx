import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Organization from './Organization';
import { TILE_WRAPPER } from 'components/Tile';

describe('Organization widget', () => {
  const onClick = jest.fn();
  const props = {
    onClick,
  };
  const content = {
    description: 'Your organization has 6 drivers share to all colleagues',
    actionTitle: 'View',
  };

  describe('Objectives shared', () => {
    it('it should render Organization widget', async () => {
      const { getByTestId } = render(<Organization {...props} />, { orgObjectives: { objectives: ['test'] } });
      const wrapper = getByTestId(TILE_WRAPPER);

      expect(wrapper).toBeInTheDocument();
    });
    it('it should render Organization content', async () => {
      const { getByText } = render(<Organization {...props} />, { orgObjectives: { objectives: ['test'] } });
      const description = getByText(content.description);
      const actionTitle = getByText(content.actionTitle);

      expect(description).toBeInTheDocument();
      expect(actionTitle).toBeInTheDocument();
    });

    it('it should render Organization content', async () => {
      const { getByText } = render(<Organization {...props} />, { orgObjectives: { objectives: ['test'] } });
      const description = getByText(content.description);
      const actionTitle = getByText(content.actionTitle);

      expect(description).toBeInTheDocument();
      expect(actionTitle).toBeInTheDocument();
    });

    it('it should call onClick', async () => {
      const { getByText } = render(<Organization {...props} />, { orgObjectives: { objectives: ['test'] } });
      const button = getByText(content.actionTitle);

      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('No objectives shared', () => {
    it('it should not render Organization widget', () => {
      const { queryByTestId } = render(<Organization {...props} />, {
        orgObjectives: { objectives: ['test'] },
        users: {
          current: {
            authenticated: true,
            info: {
              colleague: {
                colleagueUUID: 'test-colleagueUuid',
                profile: {
                  firstName: 'Test fullName',
                },
              },
              profileAttributes: [],
            },
            metadata: {
              currentCycle: 'CURRENT',
              colleagueCycle: {
                endTime: '2024-03-31T23:59:59.000Z',
                startTime: '2023-01-01T00:00:00.000Z',
                uuid: 'f766ed5d-e159-4012-892f-27928d055c0b',
                status: 'COMPLETED',
                cycleType: 'FISCAL',
              },
            },
          },
          meta: {
            loaded: true,
            loading: false,
          },
        },
      });
      const wrapper = queryByTestId(TILE_WRAPPER);

      expect(wrapper).not.toBeInTheDocument();
    });
  });
});
