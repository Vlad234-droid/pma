import { TFunction } from 'components/Translation';
import { Status, Tenant } from 'config/enum';
import { Graphics } from 'components/Icon';
import { Colors } from 'config/types';

export const getContent = (
  { status, startTime = '', lastUpdatedTime = '', viewOnly = false },
  t: TFunction,
  tenant: Tenant,
): [Graphics, Colors, Colors, boolean, boolean, string, string] => {
  const isGeneral = tenant === Tenant.GENERAL;

  switch (status) {
    case Status.COMPLETED:
      return ['roundTick', 'green', 'white', true, false, t('review_form_completed', 'Completed'), t('view', 'View')];
    case Status.NOT_STARTED:
      return [
        'calender',
        'tescoBlue',
        'white',
        false,
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
        'tescoBlue',
        true,
        true,
        isGeneral
          ? t('review_form_declined_at_date', `Declined ${lastUpdatedTime}`, { date: new Date(lastUpdatedTime) })
          : t('request_to_amend ', 'Request to amend'),
        viewOnly ? t('view', 'View') : t('view_and_edit', 'View and edit'),
      ];
    case Status.OVERDUE:
      return ['roundAlert', 'error', 'tescoBlue', true, true, t('overdue', 'Overdue'), t('view', 'View')];
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
