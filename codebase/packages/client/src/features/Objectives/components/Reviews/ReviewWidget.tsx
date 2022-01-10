import React, { FC, useState } from 'react';
import { TFunction, useTranslation } from 'components/Translation';
import { ReviewType, Status } from 'config/enum';
import { Button, colors, Colors, CreateRule, Rule, useStyle } from '@dex-ddl/core';

import { ModalComponent, ReviewFormModal } from '../Modal';
import { TileWrapper } from 'components/Tile';
import { Graphics, Icon } from 'components/Icon';

export type Props = {
  onClick: () => void;
  onClose?: () => void;
  reviewType: ReviewType;
  status?: Status;
  startTime?: string;
  endTime?: string;
  lastUpdatedTime?: string;
  customStyle?: React.CSSProperties | {};
  title: string;
};

export const TEST_ID = 'review-widget';

const getContent = (
  { status, startTime = '', lastUpdatedTime = '' },
  t: TFunction,
): [Graphics, Colors, Colors, boolean, boolean, string, string] => {
  if (!status) {
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
  const contents: { [key: string]: [Graphics, Colors, Colors, boolean, boolean, string, string] } = {
    [Status.NOT_STARTED]: [
      'calender',
      'tescoBlue',
      'white',
      true,
      false,
      t('form_available_in_date', `The form will be available in ${startTime}`, { date: new Date(startTime) }),
      '',
    ],
    [Status.STARTED]: [
      'roundAlert',
      'pending',
      'tescoBlue',
      true,
      true,
      t('your_form_is_now_available', 'Your form is now available'),
      t('view', 'View'),
    ],
    [Status.DECLINED]: [
      'roundPencil',
      'base',
      'white',
      true,
      true,
      t('review_form_declined', 'Declined'),
      t('view_and_edit', 'View and edit'),
    ],
    [Status.DRAFT]: [
      'roundPencil',
      'base',
      'tescoBlue',
      true,
      true,
      t('review_widget_saved_as_draft', 'Your form is currently saved as a draft'),
      t('view_and_edit', 'View and edit'),
    ],
    [Status.APPROVED]: [
      'roundTick',
      'green',
      'white',
      true,
      true,
      t(
        'review_form_approved',
        t('completed_at_date', `Completed [${lastUpdatedTime}]`, { date: new Date(lastUpdatedTime) }),
      ),
      t('view', 'View'),
    ],
    [Status.WAITING_FOR_APPROVAL]: [
      'roundClock',
      'pending',
      'tescoBlue',
      true,
      true,
      t('review_form_waiting_for_approval', 'Waiting for approval'),
      t('view', 'View'),
    ],
    [Status.COMPLETED]: [
      'roundTick',
      'green',
      'white',
      true,
      false,
      t('review_form_completed', 'Completed'),
      t('view', 'View'),
    ],
  };

  return contents[status];
};

const getReviewTypeContent = (reviewType: ReviewType, status: Status, t: TFunction) => {
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

const ReviewWidget: FC<Props> = ({
  customStyle,
  reviewType,
  status = Status.NOT_STARTED,
  startTime,
  lastUpdatedTime,
  title,
}) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [graphic, iconColor, background, shadow, hasDescription, content, buttonContent] = getContent(
    {
      status,
      startTime,
      lastUpdatedTime,
    },
    t,
  );

  const { reviewTypeContent } = getReviewTypeContent(reviewType, status, t);

  const descriptionColor = background === 'tescoBlue' ? colors.white : colors.base;
  const titleColor = background === 'tescoBlue' ? colors.white : colors.tescoBlue;
  const buttonVariant = background === 'tescoBlue' ? 'default' : 'inverse';

  const handleClickOpen = () => {
    status !== Status.NOT_STARTED && setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };

  return (
    <TileWrapper customStyle={{ ...customStyle }} hover={shadow} boarder={shadow} background={background}>
      <div className={css(wrapperStyle)} onClick={handleClickOpen} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <div className={css(headerBlockStyle)}>
            <span className={css(titleStyle({ color: titleColor }))}>{title}</span>
            {hasDescription && (
              <span className={css(descriptionStyle({ color: descriptionColor }))}>{reviewTypeContent}</span>
            )}
            <span
              className={css(descriptionStyle({ color: descriptionColor }), {
                paddingTop: '16px',
                verticalAlign: 'middle',
              })}
            >
              <Icon
                graphic={graphic}
                iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }}
                backgroundRadius={12}
                fill={colors[iconColor]}
              />
              {content}
            </span>
          </div>
        </div>
        {status !== Status.NOT_STARTED && (
          <div className={css(bodyStyle)}>
            <div className={css(bodyBlockStyle)}>
              <Button
                mode={buttonVariant}
                styles={[buttonStyle({ inverse: buttonVariant === 'default' })]}
                onPress={handleClickOpen}
              >
                {buttonContent}
              </Button>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <ModalComponent onClose={handleClickClose} title={title}>
          <ReviewFormModal reviewType={reviewType} onClose={handleClickClose} />
        </ModalComponent>
      )}
    </TileWrapper>
  );
};

const wrapperStyle: Rule = {
  padding: '24px 30px',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  flexDirection: 'column',
  display: 'flex',
};

const headStyle: Rule = {
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};

const bodyBlockStyle: Rule = {
  display: 'grid',
};

const titleStyle: CreateRule<{ color: string }> = ({ color }) => ({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '18px',
  marginBottom: '12px',
  color,
});

const descriptionStyle: CreateRule<{ color: string }> = ({ color }) => ({
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  color,
});

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

const buttonStyle: CreateRule<{ inverse: boolean }> =
  ({ inverse }) =>
  ({ theme }) => ({
    border: `1px solid ${inverse ? theme.colors.white : theme.colors.tescoBlue}`,
    ...theme.font.fixed.f14,
  });

export default ReviewWidget;
