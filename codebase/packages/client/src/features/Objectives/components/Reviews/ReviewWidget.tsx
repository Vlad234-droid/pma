import React, { FC } from 'react';
import { useTranslation } from 'components/Translation';
import { Status, ReviewType } from 'config/enum';
import { useStyle, Rule, CreateRule, Colors, colors } from '@dex-ddl/core';

import { ReviewFormModal } from '../Modal';
import { TileWrapper } from 'components/Tile';
import { Icon, Graphics } from 'components/Icon';
import { TriggerModalButton, ConsumerTriggerButton } from 'features/Modal';

export type Props = {
  onClick: () => void;
  onClose?: () => void;
  reviewType: ReviewType;
  status?: Status;
  startDate?: string;
  customStyle?: React.CSSProperties | {};
  title: string;
  description?: string;
};

export const TEST_ID = 'review-widget';

const getContent = ({ status, startDate = '' }): [Graphics, Colors, Colors, boolean, string, string] => {
  const { t } = useTranslation();
  if (!status) {
    return ['roundAlert', 'pending', 'tescoBlue', true, 'Your form is now available', 'View Review Form'];
  }
  const contents: { [key: string]: [Graphics, Colors, Colors, boolean, string, string] } = {
    [Status.NOT_STARTED]: ['calender', 'tescoBlue', 'white', false, `The form will be available in ${startDate}`, ''],
    [Status.STARTED]: ['roundAlert', 'pending', 'tescoBlue', true, 'Your form is now available', 'View Review Form'],
    [Status.DECLINED]: ['roundPencil', 'base', 'white', true, t('review_form_declined', 'Declined'), 'View and Edit'],
    [Status.DRAFT]: ['roundPencil', 'base', 'white', true, t('review_form_draft', 'Draft'), 'View and Edit'],
    [Status.APPROVED]: [
      'roundTick',
      'green',
      'white',
      true,
      t('review_form_approved', 'Completed [08 Sep 2020]'),
      'View Review Form',
    ],
    [Status.WAITING_FOR_APPROVAL]: [
      'roundClock',
      'pending',
      'white',
      true,
      t('review_form_waiting_for_approval', 'Waiting for approval'),
      'View Review Form',
    ],
    [Status.COMPLETED]: ['roundTick', 'green', 'white', true, t('review_form_pending', 'Pending'), 'View Review Form'],
  };

  return contents[status];
};

const ReviewWidget: FC<Props> = ({ customStyle, onClick, reviewType, status, startDate, description, title }) => {
  const { css } = useStyle();
  const [graphic, iconColor, background, shadow, content, buttonContent] = getContent({
    status,
    startDate,
  });

  const descriptionColor = background === 'tescoBlue' ? colors.white : colors.base;
  const titleColor = background === 'tescoBlue' ? colors.white : colors.tescoBlue;
  const buttonVariant = background === 'tescoBlue' ? 'default' : 'inverse';

  const handleClick = () => {
    onClick();
  };

  return (
    <TileWrapper customStyle={{ ...customStyle }} hover={shadow} boarder={shadow} background={background}>
      <div className={css(wrapperStyle)} onClick={handleClick} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <div className={css(headerBlockStyle)}>
            <span className={css(titleStyle({ color: titleColor }))}>{title}</span>
            <span className={css(descriptionStyle({ color: descriptionColor }))}>{description}</span>
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
              <TriggerModalButton name={buttonContent} title={title} mode={buttonVariant}>
                <ConsumerTriggerButton>
                  {({ onClose }) => <ReviewFormModal reviewType={reviewType} onClose={onClose} />}
                </ConsumerTriggerButton>
              </TriggerModalButton>
            </div>
          </div>
        )}
      </div>
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

export default ReviewWidget;
