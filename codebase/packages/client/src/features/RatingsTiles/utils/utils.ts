import { Page } from 'pages';
import { Graphics } from 'components/Icon';
import { TFunction } from 'components/Translation';

type CardsTypes = {
  title: string;
  description: string;
  //TODO: in future remove ''
  page: Page | '';
  graphic: Graphics;
};

export const getCards = (t: TFunction): Array<CardsTypes> => [
  {
    title: t('calibration_ratings', 'Calibration ratings'),
    description: t('what_how_and_overall_ratings', 'What, how and overall ratings'),
    page: Page.PREVIOUS_CALIBRATION_RATINGS,
    graphic: 'rating',
  },
  {
    title: t('objectives', 'Objectives'),
    description: t('archive_of_previous_objectives', 'Archive of previous objectives'),
    page: Page.PREVIOUS_OBJECTIVES_RATINGS,
    graphic: 'goal',
  },
  {
    title: t('review_forms', 'Review forms'),
    description: t('mid_end_review_archive', 'Mid-year and Year-end review archive'),
    page: Page.PREVIOUS_REVIEW_FORMS,
    graphic: 'document',
  },
];
