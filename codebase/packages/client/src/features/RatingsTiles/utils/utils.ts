import { Page } from 'pages';

export const getCards = (t): Array<Record<'title' | 'description' | 'page', string>> => [
  {
    title: t('calibration_ratings', 'Calibration ratings'),
    description: t('what_how_and_overall_ratings', 'What, how and overall ratings'),
    page: Page.PREVIOUS_CALIBRATION_RATINGS,
  },
  {
    title: t('objectives', 'Objectives'),
    description: t('archive_of_previous_objectives', 'Archive of previous objectives'),
    // TODO: in future replace to Page.PREVIOUS_OBJECTIVES_RATINGS
    page: Page.PREVIOUS_OBJECTIVES_RATINGS,
  },
  {
    title: t('review_forms', 'Review forms'),
    description: t('mid_end_review_archive', 'Mid-year and Year-end review archive'),
    // TODO: in future replace to Page.PREVIOUS_REVIEW_FORMS
    page: '',
  },
  {
    title: t('supporting_your_performance', 'Supporting Your Performance (SYP)'),
    description: t('review_your_colleagues_performance', 'Review your colleague`s performance'),
    // TODO: in future replace to Page.PREVIOUS_REVIEW_FORMS
    page: '',
  },
];
