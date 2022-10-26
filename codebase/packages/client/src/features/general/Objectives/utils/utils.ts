import { paramsReplacer } from 'utils';
import { Page } from 'pages';

export const getWidgets = (t, isSubmittingSecondaryWidget, navigate, uuid) => [
  {
    iconGraphic: 'list',
    title: t('view_previous_ratings', 'View previous ratings'),
    customStyle: { flex: '2 1 150px' },
    //@ts-ignore
    onClick: () => navigate(paramsReplacer(`/${Page.PREVIOUS_RATINGS_TILES}`, { ':uuid': uuid })),
  },
  {
    iconGraphic: 'chat',
    title: isSubmittingSecondaryWidget
      ? t('submit_calibration_ratings', 'Submit calibration ratings')
      : t('edit_calibration_ratings', 'Edit calibration ratings'),
    data: isSubmittingSecondaryWidget
      ? t('Submit calibration ratings', 'Submit calibration ratings')
      : t('ratings_are_submitted', 'Ratings are submitted'),
    customStyle: { flex: '2 1 150px' },
    background: isSubmittingSecondaryWidget ? 'tescoBlue' : 'white',
    hover: false,
    onClick: () => undefined,
  },
  {
    iconGraphic: 'edit',
    title: t('managing_performance', 'Managing performance'),
    data: t('start_syp', 'Start SYP'),
    customStyle: { flex: '2 1 150px' },
    onClick: () => console.log(''),
  },
];
