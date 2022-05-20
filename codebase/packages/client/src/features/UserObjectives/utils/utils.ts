import { Props as SecondaryWidgetProps } from 'features/SecondaryWidget';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';

export const getWidgets = (t, isSubmittingSecondaryWidget, navigate, uuid): Array<SecondaryWidgetProps> => [
  {
    iconGraphic: 'list',
    title: t('view_previous_ratings', 'View previous ratings'),
    customStyle: { flex: '2 1 150px' },
    //@ts-ignore
    onClick: () => navigate(paramsReplacer(`/${Page.PREVIOUS_RATINGS_TILES}`, { ':uuid': uuid })),
  },
  {
    iconGraphic: 'chatSq',
    title: isSubmittingSecondaryWidget
      ? t('submit_calibration_ratings', 'Submit calibration ratings')
      : t('edit_calibration_ratings', 'Edit calibration ratings'),
    data: isSubmittingSecondaryWidget
      ? t('Submit calibration ratings', 'Submit calibration ratings')
      : t('ratings_are_submitted', 'Ratings are submitted'),
    customStyle: { flex: '2 1 150px' },
    background: isSubmittingSecondaryWidget ? 'tescoBlue' : 'white',
    hover: false,
    onClick: () =>
      navigate(
        paramsReplacer(`/${Page.CALIBRATION_RATINGS}`, { ':type': isSubmittingSecondaryWidget ? 'submit' : 'edit' }),
      ),
  },
  {
    iconGraphic: 'edit',
    title: t('managing_performance', 'Managing performance'),
    data: t('start_syp', 'Start SYP'),
    customStyle: { flex: '2 1 150px' },
    onClick: () => console.log(''),
  },
];
