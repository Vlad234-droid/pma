import React, { cloneElement, FC, ReactElement } from 'react';
import configureStore from 'redux-mock-store';
import { render, RenderResult, screen as screenTestingLibrary, Screen } from '@testing-library/react';
import { DDLProvider } from '@pma/dex-wrapper';
import { Provider } from 'react-redux';
import { I18nextProvider } from './mocks/react-i18next';
import i18n from './mocks/i18';

const App: FC = (props) => <DDLProvider {...props} />;

export type RenderResultWithProps<TProps> = RenderResult & {
  rerenderWithProps: (props: Partial<TProps>) => void;
};

export const renderWithTheme = <TProps extends {} = {}>(
  component: ReactElement<TProps>,
  initState?: any,
): RenderResultWithProps<TProps> => {
  const mockStore = configureStore([]);
  const store = mockStore({
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
            status: 'STARTED',
            cycleType: 'HIRING',
          },
        },
      },
      meta: {
        loaded: true,
        loading: false,
      },
    },
    schema: { meta: { loading: false, loaded: false, error: null } },
    reviews: { meta: { loading: false, loaded: false, error: null } },
    objectivesSharing: { meta: { loading: false, loaded: false, error: null }, objectives: [], isShared: false },
    notes: { notes: [], folders: [], meta: { loading: false, loaded: false, error: null } },
    feedback: {
      feedbacks: {
        give: [],
        respond: [],
        view: [],
        meta: { loading: false, loaded: true, error: null },
      },
      feedbacksCount: {
        given: 0,
        requested: 0,
      },
      reviews: [],
      meta: { loading: false, loaded: false, error: null },
    },
    report: {
      objectiveReports: [],
      objectiveStatistics: [],
      colleagues: [],
      meta: { loading: false, loaded: false, error: null },
    },
    colleague: {
      meta: { loading: false, loaded: true },
      colleague: {
        profile: {
          fullName: 'test-name',
          managerName: 'test-manager',
          department: 'test-department',
          job: 'test-job',
        },
      },
    },
    colleagues: { list: [{}] },
    processTemplate: { meta: { loading: false, loaded: false, error: null }, success: true, data: [] },
    timeline: { meta: { loading: false, loaded: false, error: null }, success: true, 'test-colleagueUuid': [] },
    ...initState,
  });

  store.dispatch = jest.fn();

  const wrapper = render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App>{component}</App>
      </I18nextProvider>
    </Provider>,
  );

  const rerenderWithProps = (props: Partial<TProps>) => {
    const updatedComponent = cloneElement(component, {
      ...component.props,
      ...props,
    });
    wrapper.rerender(<App>{updatedComponent}</App>);
  };

  return { ...wrapper, rerenderWithProps };
};

export const screen: Screen = screenTestingLibrary;
