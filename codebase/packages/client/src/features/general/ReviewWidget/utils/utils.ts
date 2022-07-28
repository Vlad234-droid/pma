import { Colors } from '@pma/dex-wrapper';

import { TFunction } from 'components/Translation';
import { Graphics } from 'components/Icon';
import { ReviewType, Status, Tenant } from 'config/enum';
import { useTenant } from 'features/general/Permission';

export const getContent = (
  { status, startTime = '', lastUpdatedTime = '' },
  t: TFunction,
): [Graphics, Colors, Colors, boolean, boolean, string, string] => {
  const tenant = useTenant();
  const isGeneral = tenant === Tenant.GENERAL;

  switch (status) {
    case Status.NOT_STARTED:
      return [
        'calender',
        'tescoBlue',
        'white',
        true,
        false,
        t('form_available_in_date', `The form will be available on ${startTime}`, { date: new Date(startTime) }),
        '',
      ];
    case Status.STARTED:
      return [
        'roundAlert',
        'pending',
        'tescoBlue',
        true,
        true,
        t('your_form_is_now_available', 'Your form is now available'),
        t('view', 'View'),
      ];
    case Status.DECLINED:
      return [
        'roundAlert',
        'error',
        'white',
        true,
        true,
        isGeneral ? t('review_form_declined', 'Declined') : t('request_to_amend ', 'Request to amend'),
        t('view_and_edit', 'View and edit'),
      ];
    case Status.OVERDUE:
      return [
        'roundAlert',
        'error',
        'tescoBlue',
        true,
        true,
        t('overdue', 'Overdue'),
        t('view_and_edit', 'View and edit'),
      ];
    case Status.DRAFT:
      return [
        'roundPencil',
        'base',
        'tescoBlue',
        true,
        true,
        t('review_widget_saved_as_draft', 'Your form is currently saved as a draft'),
        t('view_and_edit', 'View and edit'),
      ];
    case Status.APPROVED:
      return [
        'roundTick',
        'green',
        'white',
        true,
        true,
        t(
          'review_form_approved',
          t('completed_at_date', `Completed ${lastUpdatedTime}`, { date: new Date(lastUpdatedTime) }),
        ),
        t('view', 'View'),
      ];
    case Status.WAITING_FOR_APPROVAL:
      return [
        'roundClock',
        'pending',
        'tescoBlue',
        true,
        true,
        isGeneral
          ? t('review_form_waiting_for_approval', 'Waiting for approval')
          : t('review_form_waiting_for_agreement', 'Waiting for agreement'),
        t('view', 'View'),
      ];
    case Status.COMPLETED:
      return ['roundTick', 'green', 'white', true, false, t('review_form_completed', 'Completed'), t('view', 'View')];
    default:
      return [
        'roundAlert',
        'pending',
        'tescoBlue',
        true,
        true,
        t('Your form is now available'),
        t('view_review_form', 'View review form'),
      ];
  }
};

export const getReviewTypeContent = ({
  reviewType,
  status,
  t,
}: {
  reviewType: ReviewType;
  status: Status;
  t: TFunction;
  tenant: string;
}) => {
  const contents: {
    [key: string]: {
      reviewTypeContent: string;
    };
  } = {
    [ReviewType.MYR]: {
      reviewTypeContent:
        status === Status.APPROVED
          ? t('mid_year_review_widget_title_approved', 'Your mid-year review is complete.')
          : t(
              'mid_year_review_widget_title',
              'Complete this once you’ve had your mid-year conversation with your line manager.',
            ),
    },
    [ReviewType.EYR]: {
      reviewTypeContent:
        status === Status.APPROVED
          ? t('end_year_review_widget_title_approved', 'Your year-end review is complete.')
          : t(
              'end_year_review_widget_title',
              'Complete this once you’ve had your year-end conversation with your line manager.',
            ),
    },
  };

  return contents[reviewType];
};
